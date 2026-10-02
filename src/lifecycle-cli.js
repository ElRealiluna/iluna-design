#!/usr/bin/env node
import { LifecycleOrchestrator } from './lifecycle-orchestrator.js';

const prompt = process.argv.slice(2).join(' ') || 'Quiero crear una aplicación SaaS para gestionar clientes y automatizar tareas con IA';

const orchestrator = new LifecycleOrchestrator();

const result = await orchestrator.runLifecycle(prompt, {
  name: 'Proyecto IA',
  outputDir: './generated-project'
});

console.log(JSON.stringify({
  projectId: result.projectId,
  status: result.status,
  project: result.project,
  stackRecommendation: result.stackRecommendation,
  methodologyRecommendation: result.methodologyRecommendation,
  workplanSummary: {
    phases: result.workplan.phases.map((phase) => phase.title),
    tasks: result.workplan.tasks.length
  },
  generatedSummary: result.generated,
  build: result.build,
  tests: result.tests,
  qa: result.qa,
  packaging: result.packaging,
  version: result.version,
  workflowState: result.workflowState
}, null, 2));
