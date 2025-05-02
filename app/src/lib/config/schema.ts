import { z } from 'zod';

/**
 * Schema for validating prompt examples
 */
export const promptExampleSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1),
  tags: z.array(z.string().regex(/^[a-z][a-z0-9_]*$/, 'Tags must be snake_case')),
  filePath: z.string().min(1),
  updatedAt: z.string().datetime(),
});

/**
 * Schema for validating prompts
 */
export const promptSchema = z.object({
  id: z.string().uuid(),
  name: z.string().regex(/^[a-z][a-z0-9_]*$/, 'Prompt names must be snake_case'),
  description: z.string().min(1),
  tags: z.array(z.string().regex(/^[a-z][a-z0-9_]*$/, 'Tags must be snake_case')),
  filePath: z.string().min(1),
  examples: z.array(promptExampleSchema),
  updatedAt: z.string().datetime(),
});

/**
 * Schema for validating the complete configuration
 */
export const configSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  tags: z.array(z.string().regex(/^[a-z][a-z0-9_]*$/, 'Tags must be snake_case')),
  prompts: z.array(promptSchema),
  updatedAt: z.string().datetime(),
});

/**
 * Schema for validating configuration backups
 */
export const configBackupSchema = z.object({
  timestamp: z.string().datetime(),
  config: configSchema,
});
