import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { configBackupSchema, configSchema } from './schema';
import { Config, ConfigBackup, Prompt, PromptExample } from './types';

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export class ConfigManager {
  private configPath: string;
  private backupDir: string;

  constructor(configPath: string, backupDir: string) {
    this.configPath = configPath;
    this.backupDir = backupDir;
  }

  /**
   * Initialize a new config file with default values
   */
  async initialize(): Promise<void> {
    const defaultConfig: Config = {
      version: '1.0.0',
      tags: [],
      prompts: [],
      updatedAt: new Date().toISOString(),
    };

    await this.validateConfig(defaultConfig);
    await this.writeConfig(defaultConfig);
  }

  /**
   * Read and parse the config file
   */
  async readConfig(): Promise<Config> {
    try {
      const content = await fs.readFile(this.configPath, 'utf-8');
      const config = JSON.parse(content);
      await this.validateConfig(config);
      return config;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new ConfigError('Config file not found');
      }
      throw new ConfigError(`Failed to read config: ${error}`);
    }
  }

  /**
   * Write config to file
   */
  private async writeConfig(config: Config): Promise<void> {
    try {
      await this.validateConfig(config);
      await fs.writeFile(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
    } catch (error) {
      throw new ConfigError(`Failed to write config: ${error}`);
    }
  }

  /**
   * Validate config against schema
   */
  private async validateConfig(config: unknown): Promise<void> {
    try {
      await configSchema.parseAsync(config);
    } catch (error) {
      throw new ConfigError(`Invalid config: ${error}`);
    }
  }

  /**
   * Create a backup of the current config
   */
  async backup(): Promise<void> {
    try {
      const config = await this.readConfig();
      const backup: ConfigBackup = {
        timestamp: new Date().toISOString(),
        config,
      };

      await configBackupSchema.parseAsync(backup);
      const backupPath = path.join(this.backupDir, `config_backup_${backup.timestamp.replace(/[:.]/g, '-')}.json`);
      await fs.writeFile(backupPath, JSON.stringify(backup, null, 2), 'utf-8');
    } catch (error) {
      throw new ConfigError(`Failed to create backup: ${error}`);
    }
  }

  /**
   * Restore config from a backup file
   */
  async restore(backupPath: string): Promise<void> {
    try {
      const content = await fs.readFile(backupPath, 'utf-8');
      const backup = JSON.parse(content);
      await configBackupSchema.parseAsync(backup);
      await this.writeConfig(backup.config);
    } catch (error) {
      throw new ConfigError(`Failed to restore from backup: ${error}`);
    }
  }

  /**
   * Update specific sections of the config
   */
  async updateConfig(updates: Partial<Config>): Promise<void> {
    const config = await this.readConfig();
    const updatedConfig = {
      ...config,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await this.writeConfig(updatedConfig);
  }

  /**
   * Add a new prompt to the config
   */
  async addPrompt(prompt: Omit<Prompt, 'id' | 'updatedAt'>): Promise<string> {
    const config = await this.readConfig();
    const newPrompt: Prompt = {
      ...prompt,
      id: uuidv4(),
      updatedAt: new Date().toISOString(),
    };

    config.prompts.push(newPrompt);
    config.updatedAt = new Date().toISOString();
    await this.writeConfig(config);
    return newPrompt.id;
  }

  /**
   * Add a new example to a prompt
   */
  async addExample(promptId: string, example: Omit<PromptExample, 'id' | 'updatedAt'>): Promise<string> {
    const config = await this.readConfig();
    const prompt = config.prompts.find(p => p.id === promptId);
    if (!prompt) {
      throw new ConfigError(`Prompt not found: ${promptId}`);
    }

    const newExample: PromptExample = {
      ...example,
      id: uuidv4(),
      updatedAt: new Date().toISOString(),
    };

    prompt.examples.push(newExample);
    prompt.updatedAt = new Date().toISOString();
    config.updatedAt = new Date().toISOString();
    await this.writeConfig(config);
    return newExample.id;
  }

  /**
   * Add a new tag to the global tags list
   */
  async addTag(tag: string): Promise<void> {
    const config = await this.readConfig();
    if (!config.tags.includes(tag)) {
      config.tags.push(tag);
      config.updatedAt = new Date().toISOString();
      await this.writeConfig(config);
    }
  }

  /**
   * Remove a tag from the global tags list and all prompts/examples
   */
  async removeTag(tag: string): Promise<void> {
    const config = await this.readConfig();
    config.tags = config.tags.filter(t => t !== tag);

    // Remove tag from all prompts and examples
    config.prompts = config.prompts.map(prompt => ({
      ...prompt,
      tags: prompt.tags.filter(t => t !== tag),
      examples: prompt.examples.map(example => ({
        ...example,
        tags: example.tags.filter(t => t !== tag),
        updatedAt: new Date().toISOString(),
      })),
      updatedAt: new Date().toISOString(),
    }));

    config.updatedAt = new Date().toISOString();
    await this.writeConfig(config);
  }
}
