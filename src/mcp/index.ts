import { MCPClient } from '@mastra/mcp';

console.log('Atlassian Environment Variables:');
console.log('CONFLUENCE_URL:', process.env.CONFLUENCE_URL);
console.log('CONFLUENCE_USERNAME:', process.env.CONFLUENCE_USERNAME);
console.log('CONFLUENCE_API_TOKEN:', process.env.CONFLUENCE_API_TOKEN ? '***Set***' : 'undefined');
console.log('JIRA_URL:', process.env.JIRA_URL);
console.log('JIRA_USERNAME:', process.env.JIRA_USERNAME);
console.log('JIRA_API_TOKEN:', process.env.JIRA_API_TOKEN ? '***Set***' : 'undefined');

// Create MCP client for GitHub and Atlassian servers
export const mcpClient = new MCPClient({
  servers: {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": process.env.GITHUB_PERSONAL_ACCESS_TOKEN || ""
      }
    },
    "mcp-atlassian": {
  "command": "docker",
  "args": [
    "run",
    "-i",
    "--rm",
    "-e", "CONFLUENCE_URL",
    "-e", "CONFLUENCE_USERNAME",
    "-e", "CONFLUENCE_API_TOKEN",
    "-e", "JIRA_URL",
    "-e", "JIRA_USERNAME",
    "-e", "JIRA_API_TOKEN",
    "ghcr.io/sooperset/mcp-atlassian:latest"
  ],
  "env": {
    "CONFLUENCE_URL": process.env.CONFLUENCE_URL || "https://your-company.atlassian.net/wiki",
    "CONFLUENCE_USERNAME": process.env.CONFLUENCE_USERNAME || "your.email@company.com",
    "CONFLUENCE_API_TOKEN": process.env.CONFLUENCE_API_TOKEN || "your_confluence_api_token",
    "JIRA_URL": process.env.JIRA_URL || "https://your-company.atlassian.net",
    "JIRA_USERNAME": process.env.JIRA_USERNAME || "your.email@company.com",
    "JIRA_API_TOKEN": process.env.JIRA_API_TOKEN || "your_jira_api_token"
  }
}
  }
});
