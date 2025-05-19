import {CompiledPrompt, PromptConfig, PromptTemplateDefinition, PromptVariables} from './types';

/**
 * Class representing a prompt template
 */
export class PromptDomain {
  private readonly name: string;
  private readonly type: 'text' | 'chat';
  private readonly promptText: string;
  private readonly config?: PromptConfig;
  private readonly version: number;
  private readonly labels: string[];
  private readonly tags: string[];
  private readonly createdAt: Date;

  /**
   * Create a new PromptTemplate
   */
  constructor(definition: PromptTemplateDefinition) {
    this.name = definition.name;
    this.type = definition.type || 'text';
    this.promptText = definition.prompt;
    this.config = definition.config;
    this.version = definition.version || 1;
    this.labels = definition.labels || [];
    this.tags = definition.tags || [];
    this.createdAt = definition.createdAt || new Date();
  }

  /**
   * Get the name of the prompt template
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get the version of the prompt template
   */
  getVersion(): number {
    return this.version;
  }

  /**
   * Get the prompt text
   */
  getPrompt(): string {
    return this.promptText;
  }

  /**
   * Get the configuration
   */
  getConfig(): PromptConfig | undefined {
    return this.config;
  }

  /**
   * Get the labels
   */
  getLabels(): string[] {
    return this.labels;
  }

  /**
   * Check if the template has a specific label
   */
  hasLabel(label: string): boolean {
    return this.labels.includes(label);
  }

  /**
   * Get the tags
   */
  getTags(): string[] {
    return this.tags;
  }

  /**
   * Get the creation date
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Compile the prompt template with the given variables
   */
  compile(variables: PromptVariables = {}): CompiledPrompt {
    let compiledPrompt = this.promptText;

    // Replace variables in the format {{variableName}}
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      compiledPrompt = compiledPrompt.replace(regex, String(value));
    }

    return {
      name: this.name,
      prompt: compiledPrompt,
      config: this.config,
      version: this.version,
      variables
    };
  }

  /**
   * Generate a new version of this prompt template
   */
  static generate(
      updates: Partial<Omit<PromptTemplateDefinition, 'name' | 'version'>> & { incrementVersion?: boolean }
  ): PromptDomain {
    
    return new PromptDomain({
      name: this.name,
      type: updates.type,
      prompt: updates.prompt || '',
      config: updates.config,
      version: 1,
      labels: updates.labels,
      tags: updates.tags,
      createdAt: new Date()
    });
  }

  /**
   * Convert the prompt template to a plain object
   */
  toJSON(): PromptTemplateDefinition {
    return {
      name: this.name,
      type: this.type,
      prompt: this.promptText,
      config: this.config,
      version: this.version,
      labels: this.labels,
      tags: this.tags,
      createdAt: this.createdAt
    };
  }
}