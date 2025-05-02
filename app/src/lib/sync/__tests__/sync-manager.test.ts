import type { Dirent, Stats } from 'node:fs';
import { promises as fs } from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigManager } from '../../config/manager';
import { Config } from '../../config/types';
import { SyncError, SyncManager } from '../sync-manager';

vi.mock('fs', () => ({
  promises: {
    readdir: vi.fn(),
    readFile: vi.fn(),
    stat: vi.fn(),
    access: vi.fn(),
  },
}));

vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}));

// Mock implementations
const createMockDirent = (name: string, isDir: boolean): Dirent => ({
  name,
  isDirectory: () => isDir,
  isFile: () => !isDir,
  isBlockDevice: () => false,
  isCharacterDevice: () => false,
  isFIFO: () => false,
  isSocket: () => false,
  isSymbolicLink: () => false,
  path: `/mock/prompts/${name}`,
  parentPath: '/mock/prompts',
});

const createMockStats = (mtime: Date): Stats => ({
  isFile: () => true,
  isDirectory: () => false,
  isBlockDevice: () => false,
  isCharacterDevice: () => false,
  isFIFO: () => false,
  isSocket: () => false,
  isSymbolicLink: () => false,
  dev: 0,
  ino: 0,
  mode: 0,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  size: 0,
  blksize: 4096,
  blocks: 0,
  atimeMs: mtime.getTime(),
  mtimeMs: mtime.getTime(),
  ctimeMs: mtime.getTime(),
  birthtimeMs: mtime.getTime(),
  atime: mtime,
  mtime,
  ctime: mtime,
  birthtime: mtime,
});

describe('SyncManager', () => {
  const mockConfigManager = {
    readConfig: vi.fn(),
    updateConfig: vi.fn(),
  } as unknown as ConfigManager;

  const mockPromptsDir = '/mock/prompts';
  let syncManager: SyncManager;

  beforeEach(() => {
    syncManager = new SyncManager(mockConfigManager, mockPromptsDir);
    vi.clearAllMocks();
  });

  describe('sync', () => {
    it('should sync filesystem with config.json', async () => {
      // Mock filesystem structure
      const mockDirent = createMockDirent('test_prompt', true);
      vi.mocked(fs.readdir).mockResolvedValueOnce([mockDirent]);

      // Mock prompt.md content
      vi.mocked(fs.readFile).mockResolvedValueOnce('# Test Prompt\n\nTest description\nTags: test_tag');
      vi.mocked(fs.stat).mockResolvedValueOnce(createMockStats(new Date('2024-01-01')));

      // Mock example file
      const mockExampleDirent = createMockDirent('example_1.md', false);
      vi.mocked(fs.readdir).mockResolvedValueOnce([mockExampleDirent]);
      vi.mocked(fs.readFile).mockResolvedValueOnce('# Example 1\n\nExample description\nTags: example_tag');
      vi.mocked(fs.stat).mockResolvedValueOnce(createMockStats(new Date('2024-01-01')));

      // Mock current config
      const mockConfig: Config = {
        version: '1.0.0',
        tags: [],
        prompts: [],
        updatedAt: new Date().toISOString(),
      };
      vi.mocked(mockConfigManager.readConfig).mockResolvedValueOnce(mockConfig);

      await syncManager.sync();

      // Verify config was updated
      expect(mockConfigManager.updateConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: ['example_tag', 'test_tag'],
          prompts: [
            expect.objectContaining({
              name: 'test_prompt',
              description: 'Test description',
              tags: ['test_tag'],
              examples: [
                expect.objectContaining({
                  name: 'example_1',
                  description: 'Example description',
                  tags: ['example_tag'],
                }),
              ],
            }),
          ],
        })
      );
    });

    it('should handle missing prompt.md', async () => {
      const mockDirent = createMockDirent('invalid_prompt', true);
      vi.mocked(fs.readdir).mockResolvedValueOnce([mockDirent]);
      vi.mocked(fs.access).mockRejectedValueOnce(new Error('File not found'));

      const mockConfig: Config = {
        version: '1.0.0',
        tags: [],
        prompts: [],
        updatedAt: new Date().toISOString(),
      };
      vi.mocked(mockConfigManager.readConfig).mockResolvedValueOnce(mockConfig);

      await syncManager.sync();

      // Verify no prompts were added
      expect(mockConfigManager.updateConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          prompts: [],
        })
      );
    });

    it('should remove deleted prompts from config', async () => {
      // Mock empty filesystem
      vi.mocked(fs.readdir).mockResolvedValueOnce([]);

      // Mock config with a prompt that no longer exists
      const mockConfig: Config = {
        version: '1.0.0',
        tags: ['old_tag'],
        prompts: [
          {
            id: 'test-id',
            name: 'deleted_prompt',
            description: 'Deleted prompt',
            tags: ['old_tag'],
            filePath: '/mock/prompts/deleted_prompt/prompt.md',
            examples: [],
            updatedAt: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      };
      vi.mocked(mockConfigManager.readConfig).mockResolvedValueOnce(mockConfig);

      await syncManager.sync();

      // Verify prompt was removed and tags were updated
      expect(mockConfigManager.updateConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: [],
          prompts: [],
        })
      );
    });

    it('should handle filesystem errors', async () => {
      vi.mocked(fs.readdir).mockRejectedValueOnce(new Error('Permission denied'));

      await expect(syncManager.sync()).rejects.toThrow(SyncError);
      expect(mockConfigManager.updateConfig).not.toHaveBeenCalled();
    });

    it('should handle config errors', async () => {
      vi.mocked(fs.readdir).mockResolvedValueOnce([]);
      vi.mocked(mockConfigManager.readConfig).mockRejectedValueOnce(new Error('Config error'));

      await expect(syncManager.sync()).rejects.toThrow(SyncError);
      expect(mockConfigManager.updateConfig).not.toHaveBeenCalled();
    });
  });
});
