/**
 * Represents a single example in a prompt
 */
export interface PromptExample {
  id: string;
  description: string;
  tags: string[];
  filePath: string;
  updatedAt: string;
}

/**
 * Represents a single prompt configuration
 */
export interface Prompt {
  id: string;
  name: string;
  description: string;
  tags: string[];
  filePath: string;
  examples: PromptExample[];
  updatedAt: string;
}

/**
 * Represents the complete configuration structure
 */
export interface Config {
  version: string;
  tags: string[];
  prompts: Prompt[];
  updatedAt: string;
}

/**
 * Represents a backup of the configuration
 */
export interface ConfigBackup {
  timestamp: string;
  config: Config;
}
