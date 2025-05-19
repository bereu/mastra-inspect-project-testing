import {LanguageModelV1} from '@ai-sdk/provider'

/**
 * AgentDomain - Domain class for agent management
 */

/**
 * Configuration options for agent
 */
export interface AgentConfig {
  temperature?: number;
  maxTokens?: number;

  [key: string]: any;
}

/**
 * Variables to be inserted into agent prompts
 */
export interface AgentVariables {
  [key: string]: any;
}

/**
 * Definition for creating an agent
 */
export interface AgentDefinition {
  id: string;
  model: LanguageModelV1;
  instruction: string;
  prompt: string;
  config?: AgentConfig;
}

/**
 * Main AgentDomain class for managing agents
 */
export class AgentDomain {
  private readonly id: string;
  private readonly model: LanguageModelV1;
  private readonly instruction: string;
  private readonly prompt: string;
  private readonly config?: AgentConfig;

  /**
   * Create a new AgentDomain
   */
  constructor(definition: AgentDefinition) {
    this.id = definition.id;
    this.model = definition.model;
    this.instruction = definition.instruction;
    this.prompt = definition.prompt;
    this.config = definition.config;
  }

  /**
   * Get the agent ID
   */
  getId(): string {
    return this.id;
  }

  /**
   * Get the model
   */
  getModel(): LanguageModelV1 {
    return this.model;
  }

  /**
   * Get the instruction
   */
  getInstruction(): string {
    return this.instruction;
  }

  /**
   * Get the prompt
   */
  getPrompt(): string {
    return this.prompt;
  }

  /**
   * Get the agent config
   */
  getConfig(): AgentConfig | undefined {
    return this.config;
  }

  /**
   * Compile the prompt with the given variables
   */
  compilePrompt(variables: AgentVariables = {}): string {
    let compiledPrompt = this.prompt;

    // Replace variables in the format {{variableName}}
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      compiledPrompt = compiledPrompt.replace(regex, String(value));
    }

    return compiledPrompt;
  }

  /**
   * Generate a new AgentDomain with updated properties
   */
  regenerate(updates: Partial<Omit<AgentDefinition, 'id'>>): AgentDomain {
    return new AgentDomain({
      id: this.id,
      model: updates.model || this.model,
      instruction: updates.instruction || this.instruction,
      prompt: updates.prompt || this.prompt,
      config: updates.config || this.config
    });
  }

  /**
   * Convert the agent domain to a plain object
   */
  toJSON(): AgentDefinition {
    return {
      id: this.id,
      model: this.model,
      instruction: this.instruction,
      prompt: this.prompt,
      config: this.config
    };
  }
}