/**
 * Methodology and roadmap recommendations
 */
export const methodologyTemplates = {
  agile_sprint: {
    name: 'Agile Sprint - 2 Semanas',
    description: 'Sprints cortos, entregas frecuentes',
    phases: [
      {
        name: 'Sprint 0: Setup',
        duration: '2-3 días',
        goals: [
          'Configurar repo y CI/CD',
          'Diseño de arquitectura básica',
          'Setup dev environment',
          'Planning de sprints'
        ],
        deliverables: ['Repo inicializado', 'Arquitectura documentada', 'Dev env ready']
      },
      {
        name: 'Sprint 1: MVP Core',
        duration: '2 semanas',
        goals: [
          'Funcionalidad principal implementada',
          'Auth básico',
          'Database schema',
          'UI principal'
        ],
        deliverables: ['MVP funcional', 'Tests básicos', 'Documentación']
      },
      {
        name: 'Sprint 2: Polish & Launch',
        duration: '1 semana',
        goals: [
          'Bug fixes',
          'Optimización',
          'Deploy a producción',
          'Monitoreo'
        ],
        deliverables: ['App en producción', 'Docs de operación']
      }
    ]
  },

  design_first: {
    name: 'Design First - 4-6 Semanas',
    description: 'Diseño antes de código, validar con usuarios',
    phases: [
      {
        name: 'Fase 1: Discovery',
        duration: '1 semana',
        goals: [
          'Entrevistas con usuarios',
          'Mapeo de flujos',
          'Definir pain points',
          'User personas'
        ],
        deliverables: ['Research doc', 'User flows', 'Personas']
      },
      {
        name: 'Fase 2: Design',
        duration: '1-2 semanas',
        goals: [
          'Wireframes',
          'High-fidelity mockups',
          'Design system',
          'Validar con usuarios'
        ],
        deliverables: ['Figma designs', 'Design tokens', 'Component library']
      },
      {
        name: 'Fase 3: Development',
        duration: '2-3 semanas',
        goals: [
          'Implementar componentes',
          'Backend API',
          'Integración',
          'Testing'
        ],
        deliverables: ['Frontend completo', 'API funcional', 'Tests']
      },
      {
        name: 'Fase 4: Launch',
        duration: '3-5 días',
        goals: [
          'Final polish',
          'Deploy',
          'Monitoreo',
          'Post-launch support'
        ],
        deliverables: ['App en producción', 'Monitoring setup']
      }
    ]
  },

  mvp_fast: {
    name: 'MVP Fast - 2-3 Semanas',
    description: 'Scope mínimo, lanzamiento rápido',
    phases: [
      {
        name: 'Day 1-2: Planificación',
        duration: '2 días',
        goals: ['Definir core features', 'Setup inicial', 'División de tareas'],
        deliverables: ['Feature list', 'Repo setup']
      },
      {
        name: 'Day 3-8: Development',
        duration: '1 semana',
        goals: ['Desarrollar features core', 'Integración básica', 'Testing mínimo'],
        deliverables: ['Features implementadas', 'Bug fixes básicos']
      },
      {
        name: 'Day 9-10: Launch',
        duration: '2-3 días',
        goals: ['Deploy', 'Monitoreo', 'Feedback de usuarios'],
        deliverables: ['MVP en producción', 'Feedback loop']
      }
    ]
  },

  enterprise_waterfall: {
    name: 'Enterprise - 3-4 Meses',
    description: 'Enfoque estructurado, documentación completa',
    phases: [
      {
        name: 'Fase 1: Requirements (2 semanas)',
        duration: '2 semanas',
        goals: ['Documentar requirements', 'Definir scope', 'Risk assessment'],
        deliverables: ['Requirements doc', 'Scope statement', 'Risk matrix']
      },
      {
        name: 'Fase 2: Architecture (2 semanas)',
        duration: '2 semanas',
        goals: ['Diseño técnico', 'Security review', 'Scalability plan'],
        deliverables: ['Architecture docs', 'Security plan', 'Scalability roadmap']
      },
      {
        name: 'Fase 3: Development (6-8 semanas)',
        duration: '6-8 semanas',
        goals: ['Implementación', 'Code review', 'Testing continuo'],
        deliverables: ['Code', 'Test reports', 'Documentation']
      },
      {
        name: 'Fase 4: QA & Deployment (2-3 semanas)',
        duration: '2-3 semanas',
        goals: ['QA completo', 'Load testing', 'Deploy planning'],
        deliverables: ['QA report', 'Load test results', 'Deployment guide']
      },
      {
        name: 'Fase 5: Launch & Support (1 semana)',
        duration: '1 semana',
        goals: ['Production deployment', 'Monitoring setup', 'Team training'],
        deliverables: ['App en prod', 'Monitoring', 'Training docs']
      }
    ]
  }
};

export class MethodologyRecommender {
  recommend(projectProfile) {
    const { timeline, teamSize, priorities } = projectProfile;

    // Select methodology based on profile
    let selectedMethodology = this.selectMethodology(timeline, teamSize, priorities);

    return {
      methodology: methodologyTemplates[selectedMethodology],
      reasoning: this.generateReasoning(selectedMethodology, timeline, teamSize, priorities),
      tooling: this.recommendTooling(projectProfile),
      processes: this.recommendProcesses(selectedMethodology)
    };
  }

  selectMethodology(timeline, teamSize, priorities) {
    if (timeline === '2_semanas') return 'mvp_fast';
    if (timeline === '1_mes') return 'agile_sprint';
    if (priorities.includes('speed')) return 'agile_sprint';
    if (priorities.includes('ux')) return 'design_first';
    if (teamSize === '> 10') return 'enterprise_waterfall';
    return 'design_first';
  }

  generateReasoning(methodology, timeline, teamSize, priorities) {
    const reasons = [];

    const methodologyMap = {
      'mvp_fast': 'MVP Fast seleccionado por timeline ultra corto',
      'agile_sprint': 'Agile Sprint seleccionado para iteración rápida',
      'design_first': 'Design First seleccionado para enfoque UX',
      'enterprise_waterfall': 'Enterprise Waterfall seleccionado para proyectos grandes y estructurados'
    };

    reasons.push(methodologyMap[methodology]);
    reasons.push(`Timeline: ${timeline}`);
    reasons.push(`Equipo: ${teamSize}`);
    reasons.push(`Prioridades: ${priorities.join(', ')}`);

    return reasons;
  }

  recommendTooling(projectProfile) {
    return {
      versionControl: 'GitHub',
      cicd: 'GitHub Actions',
      projectManagement: 'GitHub Projects o Linear',
      communication: 'Slack + Discord',
      design: 'Figma',
      monitoring: 'Vercel Analytics + Sentry',
      documentation: 'GitHub Wiki o Notion'
    };
  }

  recommendProcesses(methodology) {
    return {
      dailyStandup: methodology === 'mvp_fast' ? 'Async en Slack' : 'Síncrono 15min',
      codeReview: methodology === 'mvp_fast' ? 'Ligero' : 'Riguroso',
      testing: methodology === 'mvp_fast' ? 'Manual basic' : 'Automatizado completo',
      deployment: methodology === 'mvp_fast' ? 'Manual rápido' : 'Automated con gates',
      documentation: 'Paulatina según avance'
    };
  }
}
