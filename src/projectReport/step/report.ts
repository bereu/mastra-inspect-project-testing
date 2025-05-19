import {Step} from '@mastra/core';
import {z} from 'zod';
import {fetchGitHubDataStep, githubStepOutputSchema} from "@projectReport/step/github";
import {fetchJiraDataStep, jiraStepOutputSchema} from "@projectReport/step/jira";
import {reportAgent, reportAgentDomain} from "@projectReport/agent/output";


// Define schema for Jira step input

const metricsInput = z.object({
  ...githubStepOutputSchema.shape,
  ...jiraStepOutputSchema.shape,
});

const metricsOutput = z.object({
  report: z.string()
});


// Create the step to fetch Jira data
export const ReportStep = new Step({
  id: 'report data',
  description: 'organize information and report',
  inputSchema: metricsInput,
  outputSchema: metricsOutput,
  execute: async ({context}) => {

    const jiraResult = context.getStepResult(fetchJiraDataStep);
    const githubResult = context.getStepResult(fetchGitHubDataStep);

    const combinedData = JSON.stringify({
      jira: jiraResult,
      github: githubResult
    });


    const result = await reportAgent.generate(reportAgentDomain.compilePrompt({data: combinedData}), {
      output: metricsOutput
    })


    console.log(result.object.report)
    // Return the results
    return {
      report: result.object.report
    };

  },
});