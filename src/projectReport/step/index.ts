import {Step} from '@mastra/core';
import {z} from 'zod';
import {masterAgent, masterAgentDomain} from "@projectReport/agent/master";


const analyseInput = z.object({
  projectKey: z.string(),
  repo: z.string(),
  description: z.string(),
});


export const analyseOutPut = z.object({
  url: z.string(),
  projectKey: z.string(),
});


// Create the step to fetch GitHub data
export const AnalyseStep = new Step({
  id: 'analyse-step',
  description: 'analyse user query and pass to github and jira',
  inputSchema: analyseInput,
  outputSchema: analyseOutPut,
  execute: async ({context}) => {


    // Return the results
    const response = await masterAgent.generate(masterAgentDomain.compilePrompt({data: JSON.stringify(context.triggerData)}), {
          output: analyseOutPut
        }
    );
    console.log(response.object)
    return response.object
  },
});