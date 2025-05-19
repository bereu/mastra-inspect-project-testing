import {Step} from '@mastra/core';
import {z} from 'zod';
import {jiraAgent} from "@projectReport/agent/jira";
import {githubAgentDomain} from "@projectReport/agent/github";
import {AnalyseStep} from "@projectReport/step/index";

// Define schema for Jira step input
export const jiraStepInputSchema = z.object({
  projectKey: z.string()

});

// Define schema for Jira step output
export const jiraStepOutputSchema = z.object({
  project: z.object({
    name: z.string(),
    doneIssue: z.number(),
    progressIssue: z.number(),
    todoIssue: z.number(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

// Create the step to fetch Jira data
export const fetchJiraDataStep = new Step({
  id: 'fetch-jira-data',
  description: 'Fetch Jira Project Data',
  inputSchema: jiraStepInputSchema,
  outputSchema: jiraStepOutputSchema,
  execute: async ({context}) => {

    const prompt = githubAgentDomain.compilePrompt({data: JSON.stringify(context.getStepResult(AnalyseStep))})
    const result = await jiraAgent.generate(prompt, {
      output: jiraStepOutputSchema
    })
    // Return the results
    return {
      project: result.object.project,
    };
  },
});