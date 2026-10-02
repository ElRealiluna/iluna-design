export class WorkPlanGenerator {
  generate(requirements, profile, stackRecommendation) {
    const stack = stackRecommendation?.selectedStack ?? {
      name: 'Full Stack Base',
      frontend: ['Next.js'],
      backend: 'API Layer',
      database: 'PostgreSQL'
    };

    const phases = [
      {
        id: 'discovery',
        title: 'Discovery & Alignment',
        description: 'Confirmar objetivos, usuarios y canal de entrega.',
        tasks: [
          'Validar user stories',
          'Revisar alcance funcional',
          'Definir métricas de éxito'
        ]
      },
      {
        id: 'foundation',
        title: 'Foundation',
        description: 'Preparar arquitectura y flujo base.',
        tasks: [
          'Crear repositorio y estructura',
          'Configurar entorno y CI',
          'Hacer setup del stack recomendado'
        ]
      },
      {
        id: 'core',
        title: 'Core Features',
        description: 'Construir el núcleo del producto.',
        tasks: [
          'Implementar autenticación y permisos',
          'Construir flujo principal del producto',
          'Integrar base de datos y APIs'
        ]
      },
      {
        id: 'qa',
        title: 'Quality & Validation',
        description: 'Pruebas, revisión visual y validación funcional.',
        tasks: [
          'Generar pruebas unitarias',
          'Ejecutar QA',
          'Corregir bugs relevantes'
        ]
      },
      {
        id: 'launch',
        title: 'Release & Publish',
        description: 'Preparar empaquetado y publicación.',
        tasks: [
          'Empaquetar artefactos',
          'Versionado y changelog',
          'Publicación final'
        ]
      }
    ];

    const tasks = phases.flatMap((phase, index) =>
      phase.tasks.map((task, taskIndex) => ({
        id: `${phase.id}-${taskIndex + 1}`,
        phase: phase.title,
        task,
        order: index + 1,
        priority: taskIndex === 0 ? 'high' : 'medium'
      }))
    );

    return {
      projectType: requirements.projectType,
      objective: requirements.objective,
      stackSummary: {
        frontend: stack.frontend,
        backend: stack.backend,
        database: stack.database,
        hosting: stack.hosting ?? 'por definir'
      },
      complexity: profile.complexity,
      priorities: profile.priorities,
      phases,
      tasks,
      notes: [
        'Definir milestone por fase',
        'Revisar riesgos antes de implementar',
        'Priorizar el MVP antes de escalar'
      ]
    };
  }
}
