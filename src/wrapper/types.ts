export interface LangfuseConfig {
  secretKey: string;
  publicKey?: string;
  baseUrl?: string;
  release?: string;
  requestTimeout?: number;
  enabled?: boolean;
  sampleRate?: number;
}

export interface PromptMetadata {
  modelName?: string;
  userId?: string;
  projectId?: string;
  [key: string]: any;
}

export interface PromptOptions {
  name?: string;
  metadata?: PromptMetadata;
  tags?: string[];
  sessionId?: string;
  version?: string;
  isCache?: boolean;
}

export interface TraceOptions {
  name?: string;
  userId?: string;
  metadata?: Record<string, any>;
  tags?: string[];
  sessionId?: string;
  release?: string;
  public?: boolean;
  input?: any;
  output?: any;
}