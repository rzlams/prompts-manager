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
 * Creates a new prompt directory with initial files
 */
export async function createPromptDirectory(name: string, description: string, tags: string[] = []): Promise<void> {
  try {
    // Validate name format
    if (!isValidSnakeCase(name)) {
      throw new FileSystemError('Prompt name must be in snake_case format', 'INVALID_NAME');
    }

    const promptDir = path.join(process.cwd(), 'prompts', name);
    const promptFile = path.join(promptDir, 'prompt.md');

    // Create prompt directory
    await fs.mkdir(promptDir, { recursive: true });

    // Create initial prompt.md file
    const promptContent = `# ${name}\n\n${description}\n\nTags: ${tags.join(', ')}\n`;
    await fs.writeFile(promptFile, promptContent, 'utf-8');
  } catch (error: unknown) {
    if (error instanceof FileSystemError) {
      throw error;
    }
    throw new FileSystemError(`Failed to create prompt directory: ${getErrorMessage(error)}`, 'CREATE_ERROR');
  }
}

/**
 * Reads a prompt's metadata and content
 */
export async function readPrompt(name: string): Promise<{ metadata: PromptMetadata; content: string }> {
  try {
    const promptDir = path.join(process.cwd(), 'prompts', name);
    const promptFile = path.join(promptDir, 'prompt.md');

    const content = await fs.readFile(promptFile, 'utf-8');
    const stats = await fs.stat(promptFile);

    // Parse metadata from content
    const lines = content.split('\n');
    const title = lines[0].replace('# ', '');
    const description = lines[2] || '';
    const tagsLine = lines.find((line) => line.startsWith('Tags:')) || 'Tags:';
    const tags = tagsLine
      .replace('Tags:', '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

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
 * Updates an existing prompt's content
 */
export async function updatePrompt(name: string, content: string): Promise<void> {
  try {
    const promptFile = path.join(process.cwd(), 'prompts', name, 'prompt.md');
    await fs.writeFile(promptFile, content, 'utf-8');
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
