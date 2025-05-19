import {Mastra} from '@mastra/core/mastra';
import {createLogger} from '@mastra/core/logger';
import {LibSQLStore} from '@mastra/libsql';
import {LangfuseExporter} from 'langfuse-vercel';
import {fourKeysAgent} from "./agents/fourKeysAgent";
import {ProjectReportWorkflow} from "@workflow";
import {jiraAgent} from '@projectReport/agent/jira';
import {masterAgent} from '@projectReport/agent/master';
import {GithubAgent} from "@projectReport/agent/github";
import {reportAgent} from '@projectReport/agent/output';

export const mastra = new Mastra({
  agents: {fourKeysAgent, GithubAgent, jiraAgent, masterAgent, reportAgent},
  workflows: {ProjectReportWorkflow},
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
  telemetry: {
    serviceName: "ai", // this must be set to "ai" so that the LangfuseExporter thinks it's an AI SDK trace
    enabled: true,
    export: {
      type: "custom",
      exporter: new LangfuseExporter({
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        baseUrl: process.env.LANGFUSE_HOST || 'https://api.langfuse.com',
      }),
    },
  },
});
