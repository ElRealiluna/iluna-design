# AGENTS.md

## Project role

This repository is a minimal orchestration prototype for a design-first AI workflow.

## Architecture

- Orchestrator: decides which specialist should handle each request
- Design agent: focuses on UI quality, hierarchy, accessibility, layout, and copy
- Code agent: focuses on implementation, bug fixes, refactoring, and logic

## Mission

When a user requests a task, the orchestrator should:

1. Interpret the request
2. Detect whether it is primarily design, code, or mixed
3. Build a plan with clear delegation
4. Return actionable, structured output

## Conventions

- Prefer small, clear modules
- Keep the routing logic explicit and easy to extend
- Use plain JavaScript for simplicity
- Keep examples realistic for frontend and product work

## Example commands

```bash
npm start -- "Diseña una landing page para una startup de IA"
npm start -- "Revisa la accesibilidad del dashboard y corrige problemas"
npm start -- "Haz un refactor del formulario y mejora el diseño del CTA"
```
