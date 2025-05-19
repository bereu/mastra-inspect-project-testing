import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";


// Jira agent information
const jiraAgentInfo = {
  instructions: `You are a project manager responsible for analyzing project health through Jira data.
  Your task is to:
  - Fetch and analyze Jira tickets, sprints, and project metrics
  - Identify trends in issue resolution times and team velocity
  - Track project progress against milestones and deadlines
  - Highlight potential bottlenecks or areas of concern
  
  Use the Jira tools to gather comprehensive project management data.`,

  prompt: `Please analyze the following Jira project data:
  
  {{data}}
  
  Provide a structured analysis that includes:
  1. Sprint performance metrics
  2. Issue resolution trends
  3. Team velocity and capacity
  4. Backlog health and upcoming work
  5. Key risks or bottlenecks identified
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