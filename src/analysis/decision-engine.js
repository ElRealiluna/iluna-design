/**
 * Decision engine: analyzes answers and routes to appropriate recommendations
 */
export class DecisionEngine {
  constructor() {
    this.riskThreshold = 0.6;
  }

  analyze(answers) {
    const profile = {
      projectType: answers.project_type,
      complexity: this.calculateComplexity(answers),
      risks: this.identifyRisks(answers),
      constraints: this.identifyConstraints(answers),
      priorities: this.determinePriorities(answers)
    };

    return profile;
  }

  calculateComplexity(answers) {
    let score = 0;

    // Base complexity by type
    const typeComplexity = {
      'landing_page': 1,
      'saas_b2b': 3,
      'saas_b2c': 3,
      'ecommerce': 3,
      'dashboard_admin': 2,
      'marketplace': 4,
      'mobile_app': 3,
      'ai_app': 4,
      'webapp_compleja': 4,
      'mvp_interno': 2
    };

    score += typeComplexity[answers.project_type] || 2;

    // Add complexity factors
    if (answers.has_authentication === 'multirrol') score += 2;
    if (answers.has_payments) score += 2;
    if (answers.has_ai === 'agentes_autonomos') score += 2;
    if (answers.data_complexity === 'big_data') score += 2;
    if (answers.expected_users === '> 100k') score += 2;

    // Normalize to 0-5 scale
    return Math.min(5, Math.ceil(score / 2));
  }

  identifyRisks(answers) {
    const risks = [];

    // Timeline risks
    if (answers.timeline === '2_semanas' && this.calculateComplexity(answers) > 2) {
      risks.push({
        level: 'high',
        area: 'timeline',
        issue: 'Timeline muy corto para la complejidad del proyecto',
        recommendation: 'Reducir scope del MVP o extender el timeline'
      });
    }

    // Team risks
    if (answers.team_experience === 'junior' && this.calculateComplexity(answers) > 2) {
      risks.push({
        level: 'medium',
        area: 'team',
        issue: 'Equipo junior para proyecto de alta complejidad',
        recommendation: 'Considerar mentorship o traer expertise senior'
      });
    }

    // Technology risks
    if (answers.has_ai === 'agentes_autonomos' && answers.team_experience !== 'senior') {
      risks.push({
        level: 'high',
        area: 'technology',
        issue: 'Agentes IA requieren expertise avanzada',
        recommendation: 'Comienza con OpenAI API simple, escala después'
      });
    }

    // Scalability risks
    if (answers.expected_users === '> 100k' && answers.timeline === '1_mes') {
      risks.push({
        level: 'high',
        area: 'scalability',
        issue: 'No hay tiempo para arquitectura escalable',
        recommendation: 'Construir para 10k usuarios primero, refactor después'
      });
    }

    // Payment risks
    if (answers.has_payments && !answers.existing_tech) {
      risks.push({
        level: 'medium',
        area: 'compliance',
        issue: 'Pagos requieren compliance y seguridad',
        recommendation: 'Usar Stripe hosted o plataforma de pagos de terceros'
      });
    }

    return risks;
  }

  identifyConstraints(answers) {
    const constraints = [];

    if (answers.timeline && answers.timeline !== 'flexible') {
      constraints.push({
        type: 'timeline',
        value: answers.timeline,
        impact: 'Define la metodología y scope'
      });
    }

    if (answers.budget_priority === 'minimizar_costos') {
      constraints.push({
        type: 'budget',
        value: 'low',
        impact: 'Priorizar open-source y serverless'
      });
    }

    if (answers.team_size === '1_person') {
      constraints.push({
        type: 'team',
        value: 'solo_dev',
        impact: 'MVP muy reducido, MVP primero, equipo después'
      });
    }

    if (answers.existing_tech) {
      constraints.push({
        type: 'technology',
        value: answers.existing_tech,
        impact: 'Reutilizar en lugar de reescribir'
      });
    }

    return constraints;
  }

  determinePriorities(answers) {
    const priorities = [];

    if (answers.success_criteria?.includes('velocidad') || answers.timeline === '2_semanas') {
      priorities.push('speed');
    }

    if (answers.success_criteria?.includes('mantenibilidad') || answers.team_size === '1_person') {
      priorities.push('maintainability');
    }

    if (answers.expected_users === '> 100k') {
      priorities.push('scalability');
    }

    if (answers.has_payments || answers.success_criteria?.includes('seguridad')) {
      priorities.push('security');
    }

    if (answers.success_criteria?.includes('UX') || answers.target_users === 'clientes_finales') {
      priorities.push('ux');
    }

    return priorities.length > 0 ? priorities : ['balance'];
  }
}
