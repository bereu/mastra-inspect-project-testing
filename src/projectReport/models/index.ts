import {createAnthropic} from '@ai-sdk/anthropic';
import {createGoogleGenerativeAI} from '@ai-sdk/google';
import {vertexAnthropic} from '@ai-sdk/google-vertex/anthropic';

// Get API keys from environment variables
const anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';

const anthropic = createAnthropic({apiKey: anthropicApiKey});
const google = createGoogleGenerativeAI({apiKey: googleApiKey});

// Model configurations with API key from environment
export const models = {
  // Default model for general purpose tasks
  default: anthropic('claude-3-5-sonnet-20241022'),

  // Model for metrics analysis
  metrics: anthropic('claude-3-5-sonnet-20241022'),

  // Model for data processing
  dataProcessing: anthropic('claude-3-5-sonnet-20241022'),

  // Weather model (original example from template)
  weather: anthropic('claude-3-5-sonnet-20241022'),

  // Vertex AI Claude models for various tasks
  vertexClaude35Sonnet: vertexAnthropic('claude-3-5-sonnet-v2@20241022'),
  vertexClaude35Haiku: vertexAnthropic('claude-3-5-haiku@20241022'),
  vertexClaude3Opus: vertexAnthropic('claude-3-opus@20240229'),
  vertexClaude37Sonnet: vertexAnthropic('claude-3-7-sonnet@20250219'),
  vertexClaudeAnalysis: vertexAnthropic('claude-3-5-sonnet-v2@20241022'),
  vertexClaudeFast: vertexAnthropic('claude-3-5-haiku@20241022'),
};


