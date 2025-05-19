import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";

// Import jira agent prompt information
const jiraAgentInfo = {
  instructions: `you are project manager. You have to check project health with jira information.
  Please fetch information with jira tool.
  `,
  prompt: `
  Please fetch information with jira tool.
  Please fetch data.
  data: {{data}}
  `
};

// Create an AgentDomain for the Jira agent
export const jiraAgentDomain = new AgentDomain({
  id: 'jira-agent',
  model: models.metrics,
  instruction: jiraAgentInfo.instructions,
  prompt: jiraAgentInfo.prompt,
  config: {
    temperature: 0.3,
    maxTokens: 4000
  }
});

export const jiraAgent = new Agent({
  name: 'fetch and analyse jira agent',
  instructions: jiraAgentDomain.getInstruction(),
  model: jiraAgentDomain.getModel(),
  tools: await mcpClient.getTools(),
  memory
});