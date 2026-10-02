# iluna-design

Agente orquestador para proyectos de diseño y desarrollo web.

Inspirado en dos ideas muy potentes:
- Kowalski: multi-agent orchestration and delegation.
- Impeccable: design quality, UI critique, and polish flow.

This repo is a lightweight starter for a product that can decide automatically which agent should act based on the request.

## Goals

- Route user tasks to the correct specialist
- Separate design/UX from engineering work
- Keep a clear handoff between tasks
- Make multi-agent workflows easy to prototype locally

## Repo structure

- `src/index.js` - entry point for the orchestrator
- `src/agents/orchestrator.js` - decision logic and delegation
- `src/agents/design-agent.js` - design and UX specialist
- `src/agents/code-agent.js` - engineering specialist

## Quick start

```bash
npm install
npm start -- "Crea una landing page moderna para una app SaaS de IA"
```

## Example outputs

```bash
npm start -- "Haz un audit visual del checkout"
# delegate: design

npm start -- "Refactoriza el auth flow y corrige el bug del formulario"
# delegate: code

npm start -- "Necesito una landing page con diseño premium y además limpiar el flujo de login"
# delegate: design + code
```

## How delegation works

The orchestrator inspects the input and chooses one or more specialists:

- Design keywords: landing page, interface, UX, polish, audit, color, hierarchy, spacing, layout, hero, mobile, accessibility
- Code keywords: API, bug, refactor, login, backend, frontend, component, state, performance, testing
- Mixed tasks: route to design and code in sequence

## Next ideas

- Add a YAML/JSON config for agent definitions
- Add tool execution and file-based task routing
- Add a web UI or CLI command abstraction
- Connect to real design and code agents

## License

MIT
