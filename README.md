# iluna-design

Agente orquestador para diseño, desarrollo y ciclo de vida de proyectos.

## Qué incluye

- `Project Orchestrator`: intake + análisis + recomendación
- `Lifecycle Orchestrator`: requirements -> planning -> generation -> build -> testing -> quality -> packaging -> publishing -> versioning
- `design-agent` + `code-agent` + specialist workflow

## Cómo ejecutarlo

```bash
npm install
npm run lifecycle -- "Quiero crear una plataforma SaaS para gestionar clientes y automatizar tareas con IA"
```

## Resultado esperado

- Recolección de requisitos
- Planeación del trabajo
- Generación inicial del proyecto en una carpeta `generated-project/`
- Compilación básica
- Pruebas unitarias
- QA básico
- Empaquetado y versionado

## Stack recomendado por tipo

- landing page: Next.js + Tailwind
- SaaS: Next.js + TypeScript + Prisma + PostgreSQL
- AI app: Next.js + OpenAI API + PostgreSQL + vector DB opcional
- ecommerce: Next.js + Stripe + PostgreSQL
- marketplace: Next.js + NestJS + PostgreSQL + Redis + Stripe
