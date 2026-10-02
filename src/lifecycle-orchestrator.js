import { RequirementsEngine } from './requirements/requirements-engine.js';
import { ProjectOrchestrator } from './project-orchestrator.js';
import { DecisionEngine } from './analysis/decision-engine.js';
import { StackRecommender } from './recommendations/stack-recommender.js';
import { MethodologyRecommender } from './recommendations/methodology-recommender.js';
import { WorkPlanGenerator } from './planning/workplan-generator.js';
import { CodeScaffolder } from './generation/code-scaffolder.js';
import { BuildEngine } from './build/build-engine.js';
import { TestRunner } from './testing/test-runner.js';
import { QAEngine } from './quality/qa-engine.js';
import { Packager } from './packaging/packager.js';
import { VersionManager } from './versioning/version-manager.js';
import { WorkflowState } from './workflow/workflow-state.js';
import { workflowPhases } from './workflow/workflow-phases.js';

export class LifecycleOrchestrator {
  constructor() {
    this.requirementsEngine = new RequirementsEngine();
    this.projectOrchestrator = new ProjectOrchestrator();
    this.decisionEngine = new DecisionEngine();
    this.stackRecommender = new StackRecommender();
    this.methodologyRecommender = new MethodologyRecommender();
    this.workPlanGenerator = new WorkPlanGenerator();
    this.scaffolder = new CodeScaffolder();
    this.buildEngine = new BuildEngine();
    this.testRunner = new TestRunner();
    this.qaEngine = new QAEngine();
    this.packager = new Packager();
    this.versionManager = new VersionManager();
    this.workflowState = new WorkflowState();
  }

  async runLifecycle(prompt, options = {}) {
    const projectName = options.name ?? 'GeneratedProject';
    const outputDir = options.outputDir ?? './generated-project';

    this.workflowState.setStatus('in_progress');
    this.workflowState.markPhase('requirements', 'in_progress', { startedAt: new Date().toISOString() });

    const requirements = this.requirementsEngine.analyze(prompt);
    const intake = this.projectOrchestrator.startIntake();
    const profile = this.decisionEngine.analyze({
      project_type: requirements.projectType,
      has_authentication: requirements.needs.auth ? 'multirrol' : 'no',
      has_payments: requirements.needs.payments ? 'stripe' : 'no',
      has_ai: requirements.needs.ai ? 'openai_api' : 'no',
      has_integrations: requirements.needs.integrations ? 'API integrations' : 'none',
      timeline: '3_meses',
      team_size: '4_6_persons',
      team_experience: 'mid_level',
      success_criteria: requirements.objective,
      existing_tech: 'sin stack previo'
    });

    const stackRecommendation = this.stackRecommender.recommend(profile);
    const methodologyRecommendation = this.methodologyRecommender.recommend(profile);
    const workplan = this.workPlanGenerator.generate(requirements, profile, stackRecommendation);

    this.workflowState.markPhase('requirements', 'completed', { summary: requirements.projectType });
    this.workflowState.markPhase('planning', 'in_progress', { tasks: workplan.tasks.length });
    this.workflowState.addArtifact('requirements', requirements);
    this.workflowState.addArtifact('stackRecommendation', stackRecommendation);
    this.workflowState.addArtifact('workplan', workplan);

    const generated = await this.scaffolder.scaffold({
      name: projectName,
      slug: projectName.toLowerCase().replace(/\s+/g, '-'),
      objective: requirements.objective,
      stack: stackRecommendation.selectedStack.name
    }, outputDir);

    this.workflowState.markPhase('planning', 'completed', { summary: 'Plan generado' });
    this.workflowState.markPhase('generation', 'in_progress', { outputDir: generated.outputDir });
    this.workflowState.addArtifact('scaffold', generated);

    const build = await this.buildEngine.compile(generated.outputDir);
    this.workflowState.markPhase('generation', 'completed', { summary: 'Scaffold creado' });
    this.workflowState.markPhase('build', 'in_progress', { status: build.status });

    const tests = await this.testRunner.run(generated.outputDir);
    this.workflowState.markPhase('build', 'completed', { status: build.status });
    this.workflowState.markPhase('testing', 'in_progress', { total: tests.total ?? 0 });

    const qa = this.qaEngine.audit(generated.outputDir);
    this.workflowState.markPhase('testing', 'completed', { summary: 'Tests ejecutados' });
    this.workflowState.markPhase('qa', 'in_progress', { summary: qa.summary });

    const packageResult = await this.packager.package(generated.outputDir, projectName);
    this.workflowState.markPhase('qa', 'completed', { summary: qa.summary });
    this.workflowState.markPhase('packaging', 'in_progress', { artifact: packageResult.artifact });

    const version = this.versionManager.bump('patch');
    const changelog = this.versionManager.generateChangelog();
    this.workflowState.markPhase('packaging', 'completed', { version });
    this.workflowState.markPhase('versioning', 'in_progress', { version });
    this.workflowState.addArtifact('release', { version, changelog });

    this.workflowState.markPhase('versioning', 'completed', { version, summary: 'Versioning finalizado' });
    this.workflowState.markPhase('publishing', 'completed', { summary: 'Listo para publicar' });
    this.workflowState.setStatus('completed');

    await this.workflowState.saveToFile(path.join(generated.outputDir, '.workflow'));

    return {
      projectId: this.workflowState.projectId,
      status: 'completed',
      project: {
        name: projectName,
        objective: requirements.objective,
        projectType: requirements.projectType
      },
      requirements,
      intake,
      profile,
      stackRecommendation,
      methodologyRecommendation,
      workplan,
      generated,
      build,
      tests,
      qa,
      packaging: packageResult,
      version,
      changelog,
      workflowState: this.workflowState.toJSON()
    };
  }
}

export { RequirementsEngine, ProjectOrchestrator, DecisionEngine, StackRecommender, MethodologyRecommender, WorkPlanGenerator, CodeScaffolder, BuildEngine, TestRunner, QAEngine, Packager, VersionManager, workflowPhases };
