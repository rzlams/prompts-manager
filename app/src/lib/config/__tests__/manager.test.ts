import { promises as fs } from 'fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigError, ConfigManager } from '../manager';
import { Config } from '../types';

vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn().mockResolvedValue(''),
    writeFile: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('path', () => ({
  join: vi.fn((...args: string[]) => args.join('/')),
}));

describe('ConfigManager', () => {
  const mockConfigPath = '/mock/config.json';
  const mockBackupDir = '/mock/backups';
  let configManager: ConfigManager;

  beforeEach(() => {
    configManager = new ConfigManager(mockConfigPath, mockBackupDir);
    vi.clearAllMocks();
  });

  describe('initialize', () => {
    it('should create a new config file with default values', async () => {
      await configManager.initialize();

      expect(fs.writeFile).toHaveBeenCalledWith(mockConfigPath, expect.any(String), 'utf-8');

      const writtenConfig = JSON.parse(vi.mocked(fs.writeFile).mock.calls[0][1] as string);
      expect(writtenConfig).toMatchObject({
        version: '1.0.0',
        tags: [],
        prompts: [],
      });
    });
  });

  describe('readConfig', () => {
    it('should read and parse valid config file', async () => {
      const mockConfig: Config = {
        version: '1.0.0',
        tags: ['test_tag'],
        prompts: [],
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockConfig) as unknown as string);

      const result = await configManager.readConfig();
      expect(result).toEqual(mockConfig);
    });

    it('should throw ConfigError when file not found', async () => {
      vi.mocked(fs.readFile).mockRejectedValueOnce({ code: 'ENOENT' });

      await expect(configManager.readConfig()).rejects.toThrow(new ConfigError('Config file not found'));
    });

    it('should throw ConfigError for invalid JSON', async () => {
      vi.mocked(fs.readFile).mockResolvedValueOnce('invalid json');

      await expect(configManager.readConfig()).rejects.toThrow(ConfigError);
    });
  });

  describe('addPrompt', () => {
    it('should add a new prompt to config', async () => {
      const mockConfig: Config = {
        version: '1.0.0',
        tags: [],
        prompts: [],
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockConfig) as unknown as string);

      const newPrompt = {
        name: 'test_prompt',
        description: 'Test prompt',
        tags: [],
        filePath: '/test/prompt.md',
        examples: [],
      };

      const promptId = await configManager.addPrompt(newPrompt);
      expect(promptId).toBeDefined();
      expect(fs.writeFile).toHaveBeenCalled();

      const writtenConfig = JSON.parse(vi.mocked(fs.writeFile).mock.calls[0][1] as string);
      expect(writtenConfig.prompts).toHaveLength(1);
      expect(writtenConfig.prompts[0]).toMatchObject(newPrompt);
    });
  });

  describe('addExample', () => {
    it('should add example to existing prompt', async () => {
      const promptId = '123e4567-e89b-12d3-a456-426614174000';
      const mockConfig: Config = {
        version: '1.0.0',
        tags: [],
        prompts: [
          {
            id: promptId,
            name: 'test_prompt',
            description: 'Test prompt',
            tags: [],
            filePath: '/test/prompt.md',
            examples: [],
            updatedAt: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockConfig) as unknown as string);

      const newExample = {
        description: 'Test example',
        tags: [],
        filePath: '/test/example.md',
      };

      const exampleId = await configManager.addExample(promptId, newExample);
      expect(exampleId).toBeDefined();
      expect(fs.writeFile).toHaveBeenCalled();

      const writtenConfig = JSON.parse(vi.mocked(fs.writeFile).mock.calls[0][1] as string);
      expect(writtenConfig.prompts[0].examples).toHaveLength(1);
      expect(writtenConfig.prompts[0].examples[0]).toMatchObject(newExample);
    });

    it('should throw error for non-existent prompt', async () => {
      const mockConfig: Config = {
        version: '1.0.0',
        tags: [],
        prompts: [],
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockConfig) as unknown as string);

      const newExample = {
        description: 'Test example',
        tags: [],
        filePath: '/test/example.md',
      };

      await expect(configManager.addExample('non-existent', newExample)).rejects.toThrow(ConfigError);
    });
  });

  describe('tag management', () => {
    it('should add new tag to global list', async () => {
      const mockConfig: Config = {
        version: '1.0.0',
        tags: [],
        prompts: [],
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockConfig) as unknown as string);

      await configManager.addTag('new_tag');
      expect(fs.writeFile).toHaveBeenCalled();

      const writtenConfig = JSON.parse(vi.mocked(fs.writeFile).mock.calls[0][1] as string);
      expect(writtenConfig.tags).toContain('new_tag');
    });

    it('should remove tag from global list and all prompts/examples', async () => {
      const promptId = '123e4567-e89b-12d3-a456-426614174000';
      const exampleId = '987fcdeb-51a2-43d7-9012-345678901234';
      const mockConfig: Config = {
        version: '1.0.0',
        tags: ['test_tag'],
        prompts: [
          {
            id: promptId,
            name: 'test_prompt',
            description: 'Test prompt',
            tags: ['test_tag'],
            filePath: '/test/prompt.md',
            examples: [
              {
                id: exampleId,
                description: 'Test example',
                tags: ['test_tag'],
                filePath: '/test/example.md',
                updatedAt: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockConfig) as unknown as string);

      await configManager.removeTag('test_tag');
      expect(fs.writeFile).toHaveBeenCalled();

      const writtenConfig = JSON.parse(vi.mocked(fs.writeFile).mock.calls[0][1] as string);
      expect(writtenConfig.tags).not.toContain('test_tag');
      expect(writtenConfig.prompts[0].tags).not.toContain('test_tag');
      expect(writtenConfig.prompts[0].examples[0].tags).not.toContain('test_tag');
    });
  });
});
