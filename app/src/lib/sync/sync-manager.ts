import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigManager } from '../config/manager';
import { Config, Prompt } from '../config/types';

export class SyncError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SyncError';
  }
}

interface FilesystemPrompt {
  name: string;
  description: string;
  tags: string[];
  filePath: string;
  examples: FilesystemExample[];
  updatedAt: string;
}

interface FilesystemExample {
  name: string;
  description: string;
  tags: string[];
  filePath: string;
  updatedAt: string;
}

export class SyncManager {
  private configManager: ConfigManager;
  private promptsDir: string;

  constructor(configManager: ConfigManager, promptsDir: string) {
    this.configManager = configManager;
    this.promptsDir = promptsDir;
  }

  /**
   * Synchronize filesystem with config.json
   * This is the main entry point for the synchronization process
   */
  async sync(): Promise<void> {
    try {
      // 1. Scan filesystem
      const fsPrompts = await this.scanFilesystem();

      // 2. Read current config
      const config = await this.configManager.readConfig();

      // 3. Detect differences
      const { additions, deletions } = await this.detectDifferences(fsPrompts, config);

      // 4. Update config
      await this.updateConfig(config, additions, deletions);
    } catch (error) {
      throw new SyncError(`Sync failed: ${error}`);
    }
  }

  /**
   * Scan the prompts directory and build a list of prompts and examples
   */
  private async scanFilesystem(): Promise<FilesystemPrompt[]> {
    try {
      const prompts: FilesystemPrompt[] = [];
      const entries = await fs.readdir(this.promptsDir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const prompt = await this.scanPromptDirectory(entry.name);
          if (prompt) {
            prompts.push(prompt);
          }
        }
      }

      return prompts;
    } catch (error) {
      throw new SyncError(`Failed to scan filesystem: ${error}`);
    }
  }

  /**
   * Scan a single prompt directory
   */
  private async scanPromptDirectory(promptName: string): Promise<FilesystemPrompt | null> {
    try {
      const promptDir = path.join(this.promptsDir, promptName);
      const promptFile = path.join(promptDir, 'prompt.md');

      // Check if prompt.md exists
      try {
        await fs.access(promptFile);
      } catch {
        return null;
      }

      // Read prompt.md
      const promptContent = await fs.readFile(promptFile, 'utf-8');
      const promptStats = await fs.stat(promptFile);

      // Parse metadata from content
      const lines = promptContent.split('\n');
      const description = lines[2] || '';
      const tagsLine = lines.find(line => line.startsWith('Tags:')) || 'Tags:';
      const tags = tagsLine
        .replace('Tags:', '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      // Scan for examples
      const examples = await this.scanExamples(promptDir);

      return {
        name: promptName,
        description,
        tags,
        filePath: promptFile,
        examples,
        updatedAt: promptStats.mtime.toISOString(),
      };
    } catch (error) {
      throw new SyncError(`Failed to scan prompt directory ${promptName}: ${error}`);
    }
  }

  /**
   * Scan a prompt directory for example files
   */
  private async scanExamples(promptDir: string): Promise<FilesystemExample[]> {
    try {
      const examples: FilesystemExample[] = [];
      const entries = await fs.readdir(promptDir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isFile() && entry.name.startsWith('example_') && entry.name.endsWith('.md')) {
          const exampleFile = path.join(promptDir, entry.name);
          const content = await fs.readFile(exampleFile, 'utf-8');
          const stats = await fs.stat(exampleFile);

          // Parse metadata from content
          const lines = content.split('\n');
          const description = lines[2] || '';
          const tagsLine = lines.find(line => line.startsWith('Tags:')) || 'Tags:';
          const tags = tagsLine
            .replace('Tags:', '')
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean);

          examples.push({
            name: entry.name.replace('.md', ''),
            description,
            tags,
            filePath: exampleFile,
            updatedAt: stats.mtime.toISOString(),
          });
        }
      }

      return examples.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw new SyncError(`Failed to scan examples in ${promptDir}: ${error}`);
    }
  }

  /**
   * Detect differences between filesystem and config
   */
  private async detectDifferences(
    fsPrompts: FilesystemPrompt[],
    config: Config
  ): Promise<{
    additions: FilesystemPrompt[];
    deletions: Prompt[];
  }> {
    const additions: FilesystemPrompt[] = [];
    const deletions: Prompt[] = [];

    // Find additions (prompts in filesystem but not in config)
    for (const fsPrompt of fsPrompts) {
      const configPrompt = config.prompts.find(p => p.name === fsPrompt.name);
      if (!configPrompt) {
        additions.push(fsPrompt);
      }
    }

    // Find deletions (prompts in config but not in filesystem)
    for (const configPrompt of config.prompts) {
      const fsPrompt = fsPrompts.find(p => p.name === configPrompt.name);
      if (!fsPrompt) {
        deletions.push(configPrompt);
      }
    }

    return { additions, deletions };
  }

  /**
   * Update config.json with the detected differences
   */
  private async updateConfig(config: Config, additions: FilesystemPrompt[], deletions: Prompt[]): Promise<void> {
    try {
      // Remove deleted prompts
      config.prompts = config.prompts.filter(prompt => !deletions.some(d => d.name === prompt.name));

      // Add new prompts
      for (const addition of additions) {
        const newPrompt: Prompt = {
          id: uuidv4(),
          name: addition.name,
          description: addition.description,
          tags: addition.tags,
          filePath: addition.filePath,
          examples: addition.examples.map(e => ({
            id: uuidv4(),
            name: e.name,
            description: e.description,
            tags: e.tags,
            filePath: e.filePath,
            updatedAt: e.updatedAt,
          })),
          updatedAt: addition.updatedAt,
        };
        config.prompts.push(newPrompt);
      }

      // Update global tags list
      const allTags = new Set<string>();
      for (const prompt of config.prompts) {
        prompt.tags.forEach(tag => allTags.add(tag));
        for (const example of prompt.examples) {
          example.tags.forEach(tag => allTags.add(tag));
        }
      }
      config.tags = Array.from(allTags).sort();

      // Update timestamp
      config.updatedAt = new Date().toISOString();

      // Save config
      await this.configManager.updateConfig(config);
    } catch (error) {
      throw new SyncError(`Failed to update config: ${error}`);
    }
  }
}
