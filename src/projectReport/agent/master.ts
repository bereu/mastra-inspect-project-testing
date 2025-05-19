import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";

// Master agent information
const masterAgentInfo = {
  instructions: `You are a project supervisor responsible for analyzing user requests and coordinating data collection.
  Your responsibilities include:
  - Analyzing user requests to determine required information
  - Coordinating with GitHub and Jira agents to collect relevant project data
  - Ensuring all necessary information is gathered before proceeding
  - Organizing collected data for comprehensive project analysis
  
  If the information provided is insufficient, use available tools to gather additional data.`,
  
  prompt: `Please analyze the following request and determine what information needs to be collected:
  
  {{data}}
  
  Provide a structured plan that includes:
  1. Key information requirements
  2. Data sources to be accessed (GitHub, Jira, etc.)
  3. Specific metrics or insights needed
  4. Next steps for data collection
  `
};

// Create an AgentDomain for the Master agent
export const masterAgentDomain = new AgentDomain({
  id: 'master-agent',
  model: models.metrics,
  instruction: masterAgentInfo.instructions,
  prompt: masterAgentInfo.prompt,
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