import test from 'node:test';
import assert from 'node:assert/strict';
import { LifecycleOrchestrator } from '../src/lifecycle-orchestrator.js';
import { RequirementsEngine } from '../src/requirements/requirements-engine.js';

test('Requirements engine detects a SaaS project', () => {
  const engine = new RequirementsEngine();
  const result = engine.analyze('Quiero crear una plataforma SaaS para gestionar clientes y automatizar tareas con IA');
  assert.equal(result.projectType, 'saas_b2b');
  assert.ok(result.objective.length > 0);
});

test('Lifecycle orchestrator produces a full status report', async () => {
  const orchestrator = new LifecycleOrchestrator();
  const result = await orchestrator.runLifecycle('Quiero crear una app SaaS para clientes con IA', {
    name: 'DemoApp',
    outputDir: './generated-project-test'
  });

  assert.equal(result.status, 'completed');
  assert.ok(result.project);
  assert.ok(result.stackRecommendation);
  assert.ok(result.workplan);
  assert.ok(result.generated);
});
