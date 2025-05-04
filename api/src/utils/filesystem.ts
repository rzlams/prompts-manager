import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Validation schemas
const fileNameSchema = z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, 'Name must be in snake_case format');

// Types
export interface PromptMetadata {
  name: string;
  description: string;
  tags: string[];
  updatedAt: string;
}

export interface ExampleMetadata {
  name: string;
  description: string;
  tags: string[];
  updatedAt: string;
}

// Error types
export class FileSystemError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'FileSystemError';
  }
}

/**
 * Helper function to get error message from unknown error
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Validates if a string is in snake_case format
 */
export function isValidSnakeCase(name: string): boolean {
  try {
    fileNameSchema.parse(name);
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to parse prompt markdown file with header and content
 */
function parsePromptMarkdown(markdown: string): { description: string; tags: string[]; content: string } {
  const lines = markdown.split('\n');
  let headerLines: string[] = [];
  let contentLines: string[] = [];
  let inHeader = true;
  for (const line of lines) {
    if (inHeader && line.trim() === '---') {
      inHeader = false;
      continue;
    }
    if (inHeader) {
      headerLines.push(line);
    } else {
      contentLines.push(line);
    }
  }
  let description = '';
  let tags: string[] = [];
  for (const line of headerLines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (key === 'description') description = value;
    if (key === 'tags')
      tags = value
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
  }
  return { description, tags, content: contentLines.join('\n').trim() };
}

/**
 * Helper to build prompt markdown file from fields
 */
function buildPromptMarkdown({
  description,
  tags,
  content,
}: {
  description: string;
  tags: string[];
  content: string;
}): string {
  return `description: ${description}\ntags: ${tags.join(', ')}\n---\n${content}\n`;
}

/**
 * Sync config.json after prompt changes (placeholder)
 */
async function syncConfigJson() {
  // TODO: Implement config.json sync logic here
}

/**
 * Creates a new prompt directory with initial files (new markdown structure)
 */
export async function createPromptDirectory(
  name: string,
  description: string,
  tags: string[] = [],
  content = '',
): Promise<void> {
  try {
    if (!isValidSnakeCase(name)) {
      throw new FileSystemError('Prompt name must be in snake_case format', 'INVALID_NAME');
    }
    const promptDir = path.join(process.cwd(), 'prompts', name);
    const promptFile = path.join(promptDir, 'prompt.md');
    // Check for duplicate
    try {
      await fs.access(promptDir);
      throw new FileSystemError('Prompt already exists', 'DUPLICATE_NAME');
    } catch {}
    await fs.mkdir(promptDir, { recursive: true });
    const promptContent = buildPromptMarkdown({ description, tags, content });
    await fs.writeFile(promptFile, promptContent, 'utf-8');
    await syncConfigJson();
  } catch (error: unknown) {
    if (error instanceof FileSystemError) throw error;
    throw new FileSystemError(`Failed to create prompt directory: ${getErrorMessage(error)}`, 'CREATE_ERROR');
  }
}

/**
 * Reads a prompt's metadata and content (new markdown structure)
 */
export async function readPrompt(name: string): Promise<{ metadata: PromptMetadata; content: string }> {
  try {
    const promptDir = path.join(process.cwd(), 'prompts', name);
    const promptFile = path.join(promptDir, 'prompt.md');
    const markdown = await fs.readFile(promptFile, 'utf-8');
    const stats = await fs.stat(promptFile);
    const { description, tags, content } = parsePromptMarkdown(markdown);
    return {
      metadata: {
        name,
        description,
        tags,
        updatedAt: stats.mtime.toISOString(),
      },
      content,
    };
  } catch (error: unknown) {
    throw new FileSystemError(`Failed to read prompt: ${getErrorMessage(error)}`, 'READ_ERROR');
  }
}

/**
 * Updates an existing prompt's metadata and content (new markdown structure)
 * Allows changing name, description, tags, and content. Renames folder if name changes.
 */
export async function updatePrompt(
  oldName: string,
  { name, description, tags, content }: { name: string; description: string; tags: string[]; content: string },
): Promise<void> {
  try {
    if (!isValidSnakeCase(name)) {
      throw new FileSystemError('Prompt name must be in snake_case format', 'INVALID_NAME');
    }
    const oldDir = path.join(process.cwd(), 'prompts', oldName);
    const newDir = path.join(process.cwd(), 'prompts', name);
    // If name changes, check for duplicate and rename folder
    if (oldName !== name) {
      try {
        await fs.access(newDir);
        throw new FileSystemError('Prompt name already exists', 'DUPLICATE_NAME');
      } catch {}
      await fs.rename(oldDir, newDir);
    }
    const promptFile = path.join(newDir, 'prompt.md');
    const promptContent = buildPromptMarkdown({ description, tags, content });
    await fs.writeFile(promptFile, promptContent, 'utf-8');
    await syncConfigJson();
  } catch (error: unknown) {
    throw new FileSystemError(`Failed to update prompt: ${getErrorMessage(error)}`, 'UPDATE_ERROR');
  }
}

/**
 * Deletes a prompt directory and all its contents
 */
export async function deletePrompt(name: string): Promise<void> {
  try {
    const promptDir = path.join(process.cwd(), 'prompts', name);
    await fs.rm(promptDir, { recursive: true, force: true });
    await syncConfigJson();
  } catch (error: unknown) {
    throw new FileSystemError(`Failed to delete prompt: ${getErrorMessage(error)}`, 'DELETE_ERROR');
  }
}

/**
 * Creates a new example file in a prompt directory
 */
export async function createExample(
  promptName: string,
  description: string,
  content: string,
  tags: string[] = [],
): Promise<void> {
  try {
    const promptDir = path.join(process.cwd(), 'prompts', promptName);

    // Get existing example files to determine next number
    const files = await fs.readdir(promptDir, { withFileTypes: true });
    const exampleFiles = files.filter((f) => !f.isDirectory() && f.name.startsWith('example_')).map((f) => f.name);
    const nextNum = exampleFiles.length + 1;

    const exampleFile = path.join(promptDir, `example_${nextNum}.md`);
    const exampleContent = `# Example ${nextNum}\n\n${description}\n\nTags: ${tags.join(', ')}\n\n${content}`;

    await fs.writeFile(exampleFile, exampleContent, 'utf-8');
  } catch (error: unknown) {
    throw new FileSystemError(`Failed to create example: ${getErrorMessage(error)}`, 'CREATE_EXAMPLE_ERROR');
  }
}

/**
 * Lists all prompts in the prompts directory
 */
export async function listPrompts(): Promise<string[]> {
  try {
    const promptsDir = path.join(process.cwd(), 'prompts');
    const entries = await fs.readdir(promptsDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error: unknown) {
    throw new FileSystemError(`Failed to list prompts: ${getErrorMessage(error)}`, 'LIST_ERROR');
  }
}

/**
 * Lists all examples for a given prompt
 */
export async function listExamples(promptName: string): Promise<string[]> {
  try {
    const promptDir = path.join(process.cwd(), 'prompts', promptName);
    const files = await fs.readdir(promptDir, { withFileTypes: true });
    return files.filter((f) => !f.isDirectory() && f.name.startsWith('example_')).map((f) => f.name);
  } catch (error: unknown) {
    throw new FileSystemError(`Failed to list examples: ${getErrorMessage(error)}`, 'LIST_EXAMPLES_ERROR');
  }
}
