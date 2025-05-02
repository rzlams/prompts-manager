import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import {
  createExample,
  createPromptDirectory,
  deletePrompt,
  FileSystemError,
  isValidSnakeCase,
  listExamples,
  listPrompts,
  PromptMetadata,
  readPrompt,
  updatePrompt,
} from '../filesystem';

// Mock fs/promises
jest.mock('fs/promises');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock path
jest.mock('path');
const mockPath = path as jest.Mocked<typeof path>;

// Object Mother for PromptMetadata
class PromptMetadataMother {
  static create(overrides: Partial<PromptMetadata> = {}): PromptMetadata {
    return {
      name: 'test_prompt',
      description: 'Test prompt description',
      tags: ['test', 'example'],
      updatedAt: '2024-03-20T00:00:00.000Z',
      ...overrides,
    };
  }
}

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  mockPath.join.mockImplementation((...paths) => paths.join('/'));
  process.cwd = jest.fn().mockReturnValue('/test/workspace');
});

describe('isValidSnakeCase', () => {
  it('should return true for valid snake_case strings', () => {
    // Arrange
    const validNames = ['valid', 'valid_name', 'valid_name_123', 'a_b_c'];

    // Act & Assert
    validNames.forEach((name) => {
      expect(isValidSnakeCase(name)).toBe(true);
    });
  });

  it('should return false for invalid snake_case strings', () => {
    // Arrange
    const invalidNames = [
      'Invalid',
      'invalid-name',
      'invalid.name',
      'invalid__name',
      'invalid_name_',
      '_invalid_name',
      'INVALID_NAME',
      'invalid name',
      '',
    ];

    // Act & Assert
    invalidNames.forEach((name) => {
      expect(isValidSnakeCase(name)).toBe(false);
    });
  });
});

describe('createPromptDirectory', () => {
  it('should create a prompt directory with initial files', async () => {
    // Arrange
    const name = 'test_prompt';
    const description = 'Test description';
    const tags = ['test', 'example'];
    const expectedPromptContent = `# ${name}\n\n${description}\n\nTags: ${tags.join(', ')}\n`;

    // Act
    await createPromptDirectory(name, description, tags);

    // Assert
    expect(mockFs.mkdir).toHaveBeenCalledWith('/test/workspace/prompts/test_prompt', { recursive: true });
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/test/workspace/prompts/test_prompt/prompt.md',
      expectedPromptContent,
      'utf-8',
    );
  });

  it('should throw FileSystemError when name is not in snake_case', async () => {
    // Arrange
    const invalidName = 'TestPrompt';
    const description = 'Test description';

    // Act & Assert
    await expect(createPromptDirectory(invalidName, description)).rejects.toThrow(
      new FileSystemError('Prompt name must be in snake_case format', 'INVALID_NAME'),
    );
  });

  it('should throw FileSystemError when filesystem operations fail', async () => {
    // Arrange
    const name = 'test_prompt';
    const description = 'Test description';
    mockFs.mkdir.mockRejectedValue(new Error('Failed to create directory'));

    // Act & Assert
    await expect(createPromptDirectory(name, description)).rejects.toThrow(
      new FileSystemError('Failed to create prompt directory: Failed to create directory', 'CREATE_ERROR'),
    );
  });
});

describe('readPrompt', () => {
  it('should read and parse prompt metadata and content', async () => {
    // Arrange
    const name = 'test_prompt';
    const content = '# test_prompt\n\nTest description\n\nTags: test, example\n';
    const stats = { mtime: new Date('2024-03-20T00:00:00.000Z') };

    mockFs.readFile.mockResolvedValue(content);
    mockFs.stat.mockResolvedValue(stats as any);

    // Act
    const result = await readPrompt(name);

    // Assert
    expect(result).toEqual({
      metadata: {
        name: 'test_prompt',
        description: 'Test description',
        tags: ['test', 'example'],
        updatedAt: '2024-03-20T00:00:00.000Z',
      },
      content,
    });
  });

  it('should handle empty description and tags', async () => {
    // Arrange
    const name = 'test_prompt';
    const content = '# test_prompt\n\n\nTags:\n';
    const stats = { mtime: new Date('2024-03-20T00:00:00.000Z') };

    mockFs.readFile.mockResolvedValue(content);
    mockFs.stat.mockResolvedValue(stats as any);

    // Act
    const result = await readPrompt(name);

    // Assert
    expect(result).toEqual({
      metadata: {
        name: 'test_prompt',
        description: '',
        tags: [],
        updatedAt: '2024-03-20T00:00:00.000Z',
      },
      content,
    });
  });

  it('should throw FileSystemError when reading fails', async () => {
    // Arrange
    const name = 'test_prompt';
    mockFs.readFile.mockRejectedValue(new Error('File not found'));

    // Act & Assert
    await expect(readPrompt(name)).rejects.toThrow(
      new FileSystemError('Failed to read prompt: File not found', 'READ_ERROR'),
    );
  });
});

describe('updatePrompt', () => {
  it('should update prompt content', async () => {
    // Arrange
    const name = 'test_prompt';
    const content = '# Updated content';

    // Act
    await updatePrompt(name, content);

    // Assert
    expect(mockFs.writeFile).toHaveBeenCalledWith('/test/workspace/prompts/test_prompt/prompt.md', content, 'utf-8');
  });

  it('should throw FileSystemError when update fails', async () => {
    // Arrange
    const name = 'test_prompt';
    const content = '# Updated content';
    mockFs.writeFile.mockRejectedValue(new Error('Write failed'));

    // Act & Assert
    await expect(updatePrompt(name, content)).rejects.toThrow(
      new FileSystemError('Failed to update prompt: Write failed', 'UPDATE_ERROR'),
    );
  });
});

describe('deletePrompt', () => {
  it('should delete prompt directory', async () => {
    // Arrange
    const name = 'test_prompt';

    // Act
    await deletePrompt(name);

    // Assert
    expect(mockFs.rm).toHaveBeenCalledWith('/test/workspace/prompts/test_prompt', { recursive: true, force: true });
  });

  it('should throw FileSystemError when deletion fails', async () => {
    // Arrange
    const name = 'test_prompt';
    mockFs.rm.mockRejectedValue(new Error('Delete failed'));

    // Act & Assert
    await expect(deletePrompt(name)).rejects.toThrow(
      new FileSystemError('Failed to delete prompt: Delete failed', 'DELETE_ERROR'),
    );
  });
});

describe('createExample', () => {
  beforeEach(() => {
    mockFs.writeFile.mockResolvedValue(undefined);
  });

  it('should create a new example file with correct numbering', async () => {
    // Arrange
    const promptName = 'test_prompt';
    const description = 'Test example';
    const content = 'Example content';
    const tags = ['test'];

    const mockFiles = [
      { name: 'prompt.md', isDirectory: () => false } as Dirent,
      { name: 'example_1.md', isDirectory: () => false } as Dirent,
      { name: 'example_2.md', isDirectory: () => false } as Dirent,
    ];
    mockFs.readdir.mockResolvedValue(mockFiles);
    const expectedContent = `# Example 3\n\n${description}\n\nTags: ${tags.join(', ')}\n\n${content}`;

    // Act
    await createExample(promptName, description, content, tags);

    // Assert
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/test/workspace/prompts/test_prompt/example_3.md',
      expectedContent,
      'utf-8',
    );
  });

  it('should create first example when no examples exist', async () => {
    // Arrange
    const promptName = 'test_prompt';
    const description = 'Test example';
    const content = 'Example content';
    const tags: string[] = [];

    const mockFiles = [{ name: 'prompt.md', isDirectory: () => false } as Dirent];
    mockFs.readdir.mockResolvedValue(mockFiles);
    const expectedContent = `# Example 1\n\n${description}\n\nTags: \n\n${content}`;

    // Act
    await createExample(promptName, description, content, tags);

    // Assert
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/test/workspace/prompts/test_prompt/example_1.md',
      expectedContent,
      'utf-8',
    );
  });

  it('should throw FileSystemError when creation fails', async () => {
    // Arrange
    const promptName = 'test_prompt';
    const description = 'Test example';
    const content = 'Example content';
    mockFs.readdir.mockRejectedValue(new Error('Directory not found'));

    // Act & Assert
    await expect(createExample(promptName, description, content)).rejects.toThrow(
      new FileSystemError('Failed to create example: Directory not found', 'CREATE_EXAMPLE_ERROR'),
    );
  });
});

describe('listPrompts', () => {
  it('should list all prompt directories', async () => {
    // Arrange
    const mockEntries = [
      { name: 'test_prompt_1', isDirectory: () => true } as Dirent,
      { name: 'test_prompt_2', isDirectory: () => true } as Dirent,
      { name: 'not_a_prompt', isDirectory: () => false } as Dirent,
    ];
    mockFs.readdir.mockResolvedValue(mockEntries);

    // Act
    const result = await listPrompts();

    // Assert
    expect(result).toEqual(['test_prompt_1', 'test_prompt_2']);
  });

  it('should throw FileSystemError when listing fails', async () => {
    // Arrange
    mockFs.readdir.mockRejectedValue(new Error('Permission denied'));

    // Act & Assert
    await expect(listPrompts()).rejects.toThrow(
      new FileSystemError('Failed to list prompts: Permission denied', 'LIST_ERROR'),
    );
  });
});

describe('listExamples', () => {
  it('should list all example files for a prompt', async () => {
    // Arrange
    const promptName = 'test_prompt';
    const mockFiles = [
      { name: 'prompt.md', isDirectory: () => false } as Dirent,
      { name: 'example_1.md', isDirectory: () => false } as Dirent,
      { name: 'example_2.md', isDirectory: () => false } as Dirent,
      { name: 'other.md', isDirectory: () => false } as Dirent,
    ];
    mockFs.readdir.mockResolvedValue(mockFiles);

    // Act
    const result = await listExamples(promptName);

    // Assert
    expect(result).toEqual(['example_1.md', 'example_2.md']);
  });

  it('should return empty array when no examples exist', async () => {
    // Arrange
    const promptName = 'test_prompt';
    const mockFiles = [
      { name: 'prompt.md', isDirectory: () => false } as Dirent,
      { name: 'other.md', isDirectory: () => false } as Dirent,
    ];
    mockFs.readdir.mockResolvedValue(mockFiles);

    // Act
    const result = await listExamples(promptName);

    // Assert
    expect(result).toEqual([]);
  });

  it('should throw FileSystemError when listing fails', async () => {
    // Arrange
    const promptName = 'test_prompt';
    mockFs.readdir.mockRejectedValue(new Error('Directory not found'));

    // Act & Assert
    await expect(listExamples(promptName)).rejects.toThrow(
      new FileSystemError('Failed to list examples: Directory not found', 'LIST_EXAMPLES_ERROR'),
    );
  });
});
