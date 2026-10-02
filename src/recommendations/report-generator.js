/**
 * Final recommendation report generator
 */
export class RecommendationReport {
  constructor(profile, stackRecommendation, methodologyRecommendation) {
    this.profile = profile;
    this.stackRecommendation = stackRecommendation;
    this.methodologyRecommendation = methodologyRecommendation;
  }

  generate() {
    return {
      executive_summary: this.generateSummary(),
      project_profile: this.profile,
      technical_stack: this.stackRecommendation,
      methodology: this.methodologyRecommendation,
      roadmap: this.generateRoadmap(),
      next_steps: this.generateNextSteps(),
      risks_and_mitigations: this.generateRiskMitigations()
    };
  }

  generateSummary() {
    const { projectType, complexity, risks, priorities } = this.profile;
    const { selectedStack } = this.stackRecommendation;
    const { methodology } = this.methodologyRecommendation;

    return {
      project_type: projectType,
      complexity_level: `${complexity}/5`,
      estimated_timeline: selectedStack.timeline,
      estimated_cost: selectedStack.cost,
      team_required: this.estimateTeamSize(),
      methodology: methodology.name,
      key_risks: risks.length,
      success_factors: priorities
    };
  }

  estimateTeamSize() {
    const { complexity } = this.profile;
    if (complexity <= 1) return '1 developer';
    if (complexity <= 2) return '2 developers';
    if (complexity <= 3) return '2-3 developers + designer';
    if (complexity === 4) return '4-6 developers + designer + QA';
    return '6+ developers + full team';
  }

  generateRoadmap() {
    const { methodology } = this.methodologyRecommendation;
    const phases = methodology.phases || [];

    return phases.map((phase, index) => ({
      order: index + 1,
      name: phase.name,
      duration: phase.duration,
      goals: phase.goals,
      deliverables: phase.deliverables,
      dependencies: index > 0 ? [phases[index - 1].name] : []
    }));
  }

  generateNextSteps() {
    return [
      '1. Revisar y validar esta recomendación con el equipo',
      '2. Crear repository con el stack recomendado',
      '3. Inicializar development environment',
      '4. Setup de CI/CD pipeline',
      '5. Crear project board con las fases definidas',
      '6. Primer sprint/fase de setup',
      '7. Weekly reviews de progreso'
    ];
  }

  generateRiskMitigations() {
    return this.profile.risks.map(risk => ({
      risk: risk.issue,
      level: risk.level,
      area: risk.area,
      mitigation: risk.recommendation,
      owner: 'Tech Lead',
      status: 'pending_validation'
    }));
  }
}

export function generateProjectReport(answers) {
  const DecisionEngine = (await import('./decision-engine.js')).DecisionEngine;
  const StackRecommender = (await import('./stack-recommender.js')).StackRecommender;
  const MethodologyRecommender = (await import('./methodology-recommender.js')).MethodologyRecommender;

  const decisionEngine = new DecisionEngine();
  const profile = decisionEngine.analyze(answers);

  const stackRecommender = new StackRecommender();
  const stackRec = stackRecommender.recommend(profile);

  const methodologyRecommender = new MethodologyRecommender();
  const methodologyRec = methodologyRecommender.recommend(profile);

  const report = new RecommendationReport(profile, stackRec, methodologyRec);
  return report.generate();
}
