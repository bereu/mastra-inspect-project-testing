
import { createAnthropic } from '@ai-sdk/anthropic';

// Get API key from environment variables
const apiKey = process.env.ANTHROPIC_API_KEY || '';
const anthropic = createAnthropic({ apiKey });

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
};