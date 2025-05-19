import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";

// Master agent instructions
const masterInstructions = `
you are supuer visor. you receive user request and analyse.
and pass to next member.

Please analyse user request and fetch github and jira information.
and pass to next node.

if it is not enough. Please fetch information with tools.
`;

// Create an AgentDomain for the Master agent
export const masterAgentDomain = new AgentDomain({
  id: 'master-agent',
  model: models.metrics,
  instruction: masterInstructions,
  prompt: `Please analyze the following request: {{
  data}}`,
  config: {
    temperature: 0.2,
    maxTokens: 4000
  }
});

console.log(masterAgentDomain.getInstruction())

export const masterAgent = new Agent({
  name: 'analyse input and pass to next step',
  instructions: masterAgentDomain.getInstruction(),
  model: masterAgentDomain.getModel(),
  tools: await mcpClient.getTools(),
  memory
});