import { ProjectOrchestrator } from './project-orchestrator.js';

/**
 * CLI Demo: Interactive project orchestrator
 * Usage: node src/project-orchestrator-cli.js
 */

const orchestrator = new ProjectOrchestrator();

// Demo: Full flow
async function runDemo() {
  console.log('\n🚀 PROJECT ORCHESTRATOR - DEMO\n');

  // Start intake
  const intake = orchestrator.startIntake();
  console.log(intake.message);
  console.log(`Progress: ${intake.progress.percentage}%\n`);

  // Simulated answers for demo
  const simulatedAnswers = {
    project_type: 'saas_b2b',
    main_objective: 'Gestionar clientes y proyectos internos',
    target_users: 'empleados_internos',
    complexity_level: 'media',
    expected_users: '1k-10k',
    has_authentication: 'multirrol',
    has_payments: 'no',
    has_ai: 'no',
    has_integrations: 'Slack, Google Drive',
    data_complexity: 'relacional_complejo',
    timeline: '3_meses',
    team_size: '4_6_persons',
    team_experience: 'mid_level',
    existing_tech: 'API en Node.js ya existe',
    budget_priority: 'balance',
    success_criteria: 'Facilidad de mantenimiento y escalabilidad',
    maintenance_strategy: 'mantenimiento_continuo'
  };

  // Process answers
  console.log('📋 Procesando respuestas...\n');

  for (const [questionId, answer] of Object.entries(simulatedAnswers)) {
    const result = orchestrator.answerQuestion(questionId, answer);

    if (result.stage === 'recommendation') {
      console.log('\n✅ Análisis completado!\n');
      console.log('=' .repeat(80));
      console.log('RECOMENDACIÓN FINAL');
      console.log('='.repeat(80));
      printReport(result.report);
      break;
    }
  }
}

function printReport(report) {
  console.log('\n📊 RESUMEN EJECUTIVO');
  console.log('-'.repeat(80));
  const summary = report.executive_summary;
  console.log(`Tipo de Proyecto: ${summary.project_type}`);
  console.log(`Complejidad: ${summary.complexity_level}`);
  console.log(`Timeline Estimado: ${summary.estimated_timeline}`);
  console.log(`Costo: ${summary.estimated_cost}`);
  console.log(`Equipo Requerido: ${summary.team_required}`);
  console.log(`Metodología: ${summary.methodology}`);
  console.log(`Factores de Éxito: ${summary.success_factors.join(', ')}`);

  console.log('\n🔧 STACK TÉCNICO RECOMENDADO');
  console.log('-'.repeat(80));
  const stack = report.technical_stack.selectedStack;
  console.log(`Frontend: ${stack.frontend.join(', ')}`);
  console.log(`Backend: ${stack.backend}`);
  console.log(`Database: ${stack.database}`);
  if (stack.hosting) console.log(`Hosting: ${stack.hosting}`);
  if (stack.auth) console.log(`Auth: ${stack.auth}`);
  if (stack.extra) console.log(`Extra: ${stack.extra.join(', ')}`);

  console.log('\n📅 ROADMAP');
  console.log('-'.repeat(80));
  report.roadmap.forEach(phase => {
    console.log(`\n${phase.order}. ${phase.name} (${phase.duration})`);
    console.log(`   Goals: ${phase.goals.join(', ')}`);
    console.log(`   Deliverables: ${phase.deliverables.join(', ')}`);
  });

  console.log('\n⚠️  RIESGOS IDENTIFICADOS');
  console.log('-'.repeat(80));
  report.risks_and_mitigations.forEach(risk => {
    console.log(`\n[${risk.level.toUpperCase()}] ${risk.risk}`);
    console.log(`Mitigación: ${risk.mitigation}`);
  });

  console.log('\n🎯 PRÓXIMOS PASOS');
  console.log('-'.repeat(80));
  report.next_steps.forEach(step => console.log(step));

  console.log('\n' + '='.repeat(80));
}

runDemo().catch(console.error);
