# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `npm run build`
- Development: `npm run dev`
- Typecheck: `npx tsc --noEmit`

## Common Code Guidelines

- **Imports**: Group imports by source (internal/external). Use explicit imports from packages.
- **TypeScript**: Use strict typing. Define interfaces for complex object structures.
- **Naming**: camelCase for variables/functions, PascalCase for classes/types, ALL_CAPS for constants.
- **Error Handling**: Use try/catch blocks with specific error types. Throw meaningful errors.
- **Formatting**: Use 2-space indentation. No trailing whitespace. Line length limit of 100 characters.
- **Functions**: Prefer arrow functions. Keep functions small and focused. Avoid side effects.
- **Async**: Use async/await over Promise chains. Handle Promise rejections properly.
- **Architecture**: Follow Mastra project structure with agents and tools in their respective directories. Domain
  classes should be added in `src/domain`.
- **Domain Classes**: Domain classes should not have setters. Use perfect constructors. For updates, implement
  regenerate methods instead.
- **Imports**: When importing modules, use path aliases to prevent build errors. If path aliases don't exist, add them.
- **Path Aliases**: Path aliases should be at the directory level, e.g., `"@projectReport/*": ["src/projectReport/*"]`.

## Project Code Guidelines

- **Architecture**:  If using MCP server, add related files to `src/mastra/mcp`.
- **Architecture**: Follow Mastra project structure with agents and tools in their respective directories.
- **Mastra Documentation**: When checking Mastra, reference the documentation at https://mastra.ai/en/docs and report
  which specific page was referenced by including the full URL.
- **Lang Fuse Documentation**: When checking Lang Fuse, reference the documentation
  at https://langfuse.com/docs/sdk/typescript/guide and report which specific page was referenced by including the full
  URL.
- **Directory Structure**: Project code should follow the structure shown below. Note that the `mcp` and `wrapper`
  directories are utilities used across all projects.

```mermaid
graph TD
    A[src] --> B[project1]
    A --> C[project2]
    A --> D[project3]
    A --> E[mastra]
    E --> F[mcp]
    A --> G[wrapper]
    
    style F fill:#f9f,stroke:#333,stroke-width:2px
    style G fill:#bbf,stroke:#333,stroke-width:2px
    
    classDef utility fill:#bbf,stroke:#333,stroke-width:1px
    class F,G utility