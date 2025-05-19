import {Step} from '@mastra/core';
import {z} from 'zod';
import {GithubAgent, githubAgentDomain} from "@projectReport/agent/github";
import {analyseOutPut, AnalyseStep} from "@projectReport/step/index";


// Define schema for GitHub step input
export const githubStepInputSchema = z.object({
  url: z.string(),
});

// Define schema for GitHub step output
export const githubStepOutputSchema = z.object({
  github: z.object({
    commits: z.array(z.any()).optional(),
    pullRequests: z.array(z.any()).optional(),
    issues: z.array(z.any()).optional(),
    deployments: z.array(z.any()).optional(),
  }),
});

// Create the step to fetch GitHub data
export const fetchGitHubDataStep = new Step({
  id: 'fetch-github-data',
  description: 'Fetch GitHub Repository Data',
  inputSchema: analyseOutPut,
  outputSchema: githubStepOutputSchema,
  execute: async ({context}) => {

    console.log(context.getStepResult(AnalyseStep), 'GITHUB');
    const prompt = githubAgentDomain.compilePrompt({data: JSON.stringify(context.getStepResult(AnalyseStep))})
    console.log(prompt, 'PROMPT')

    const result = await GithubAgent.generate(prompt, {
          output: githubStepOutputSchema
        }
    )
    console.log(result)
    // Return the results
    return {
      github: {
        commits: result.object.github.commits || [],
        pullRequests: result.object.github.pullRequests || [],
        issues: result.object.github.issues || [],
        deployments: result.object.github.deployments || [],
      }
    };

  },
});