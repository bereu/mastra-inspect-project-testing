import {Langfuse} from 'langfuse';

export class LangfuseWrapper {
  private client: Langfuse = new Langfuse({
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
    baseUrl: process.env.LANGFUSE_BASE_URL,
  });

  async createTextPrompt(options: {
    name: string;
    prompt: string;
    labels?: string[];
    config?: Record<string, any>;
  }) {
    return await this.client.createPrompt({
      name: options.name,
      type: "text",
      prompt: options.prompt,
      labels: options.labels,
      config: options.config,
    });
  }

  
}