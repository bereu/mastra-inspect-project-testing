import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {fourKeysPrompt} from '@prompts/fourKeysPrompt';
import {mcpClient} from "@src/mcp";
import {memory} from "@src/const/const";


export const fourKeysAgent = new Agent({
  name: 'Four Keys Metrics Agent',
  instructions: fourKeysPrompt,
  model: models.metrics,
  tools: await mcpClient.getTools(),
  memory
});

