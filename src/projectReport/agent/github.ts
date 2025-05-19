import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";

// GitHub agent information
const githubAgentInfo = {
  instructions: `You are a project manager responsible for checking project health with GitHub information.
  Your task is to fetch and analyze repository data using GitHub tools to provide insights on:
  - Code commit frequency and patterns
  - Pull request metrics (time to merge, review cycles)
  - Issue tracking and resolution times
  - Repository activity and contributor metrics
  
  Use the GitHub tools to gather this information efficiently.`,
  
  prompt: `Please fetch and analyze the following GitHub repository data:
  
  {{data}}
  
  Provide a structured analysis that includes:
  1. Repository activity metrics
  2. Code contribution patterns
  3. Pull request and issue statistics
  4. Key insights and trends
  `
};

// Create an AgentDomain for the GitHub agent
export const githubAgentDomain = new AgentDomain({
  id: 'github-agent',
  model: models.metrics,
  instruction: githubAgentInfo.instructions,
  prompt: githubAgentInfo.prompt,
  config: {
    temperature: 0.3,
    maxTokens: 4000
  }
});

export const GithubAgent = new Agent({
  name: 'fetch and analyse github agent',
  instructions: githubAgentDomain.getInstruction(),
  model: githubAgentDomain.getModel(),
  tools: await mcpClient.getTools(),
  memory,
});