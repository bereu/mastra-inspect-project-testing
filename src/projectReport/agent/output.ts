import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";

// Output agent information
const outputAgentInfo = {
  instructions: `You are responsible for organizing and presenting project information in a clear,
  structured format. Your task is to take the analysis data provided and create a well-formatted report
  that highlights key metrics, issues, and recommendations.
  
  Your responsibilities include:
  - Synthesizing data from multiple sources (GitHub, Jira)
  - Identifying key patterns and insights across the project
  - Creating a comprehensive report with actionable recommendations
  - Formatting the output for maximum readability and impact
  
  Your output should be structured and easy to read, with clear sections and formatting.`,

  prompt: `Please organize and format the following information into a comprehensive report:

  {{data}}

  Your report should include:
  1. Executive summary
  2. Key metrics and their analysis
  3. Project health assessment based on the four key metrics:
     - Deployment Frequency
     - Lead Time for Changes
     - Time to Restore Service
     - Change Failure Rate
  4. Identified issues and risks
  5. Specific, actionable recommendations
  
  Use appropriate formatting to make the report easy to read and navigate.
  `
};

// Create an AgentDomain for the Output agent
export const reportAgentDomain = new AgentDomain({
  id: 'output-agent',
  model: models.metrics,
  instruction: outputAgentInfo.instructions,
  prompt: outputAgentInfo.prompt,
  config: {
    temperature: 0.4,
    maxTokens: 5000
  }
});

export const reportAgent = new Agent({
  name: 'organize information and output',
  instructions: reportAgentDomain.getInstruction(),
  model: reportAgentDomain.getModel(),
  tools: await mcpClient.getTools(),
  memory
});
