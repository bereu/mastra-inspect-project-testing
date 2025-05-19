import {Workflow} from '@mastra/core';
import {fetchGitHubDataStep} from "@projectReport/step/github";
import {fetchJiraDataStep} from "@projectReport/step/jira";
import {ReportStep} from "@projectReport/step/report";
import {AnalyseStep} from "@step";
import {z} from 'zod';

// Create the project report workflow
export const ProjectReportWorkflow = new Workflow({
  name: 'generate report',
  triggerSchema: z.object({
    project_key: z.string().describe('The name of the project'),
    repo_url: z.string().url().describe('The URL of the GitHub repository')
  }),
  steps: [
    fetchGitHubDataStep,
    fetchJiraDataStep,
    ReportStep,
    AnalyseStep,
  ],

});


ProjectReportWorkflow.step(AnalyseStep).then(fetchGitHubDataStep).then(fetchJiraDataStep).then(ReportStep).commit();
