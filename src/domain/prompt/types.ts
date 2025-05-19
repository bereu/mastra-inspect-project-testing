/**
 * Core types for prompt management
 */

/**
 * Configuration options for prompt templates
 */
export interface PromptConfig {
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
  [key: string]: any;
}

/**
 * Metadata for a prompt template
 */
export interface PromptMetadata {
  userId?: string;
  projectId?: string;
  [key: string]: any;
}

/**
 * Variables to be inserted into a prompt template
 */
export interface PromptVariables {
  [key: string]: any;
}

/**
 * Options when creating or retrieving a prompt
 */
export interface PromptOptions {
  name: string;
  version?: number;
  labels?: string[];
  cacheTtlSeconds?: number;
}

/**
 * Definition of a prompt template
 */
export interface PromptTemplateDefinition {
  name: string;
  type?: 'text' | 'chat';
  prompt: string;
  config?: PromptConfig;
  version?: number;
  labels?: string[];
  tags?: string[];
  createdAt?: Date;
}

/**
 * Result of compiling a prompt template with variables
 */
export interface CompiledPrompt {
  prompt: string;
  config?: PromptConfig;
  version?: number;
  name: string;
  variables: PromptVariables;
}