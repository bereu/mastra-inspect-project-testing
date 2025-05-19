import {Agent} from '@mastra/core/agent';
import {models} from '@projectReport/models';
import {mcpClient} from "@src/mcp";
import {AgentDomain} from "@domain/agent/agentDomain";
import {memory} from "@src/const/const";


export const githubAgentDomain = new AgentDomain(
    {
      instruction: `you are project manager. You have to check project health with github information.
  Please fetch information with github tool and fetch data. 
  `,
      prompt: `
  Please fetch information with github tool.
  Please fetch data.
  
  data: {{data}}
  `,
      id: 'github-agent',
      model: models.default,
    }
)

export const GithubAgent = new Agent({
  name: 'fetch and analyse github agent',
  instructions: githubAgentDomain.getInstruction(),
  model: githubAgentDomain.getModel(),
  tools: await mcpClient.getTools(),
  memory,
});