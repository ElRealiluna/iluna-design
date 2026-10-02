export const workflowPhases = [
  {
    id: 'requirements',
    name: 'Requirements Gathering',
    description: 'Obtener contexto del sistema, usuarios, objetivos y restricciones.',
    required: true
  },
  {
    id: 'planning',
    name: 'Planning',
    description: 'Crear plan de trabajo, tareas y roadmap.',
    required: true
  },
  {
    id: 'generation',
    name: 'Code Generation',
    description: 'Generar estructura inicial y archivos del proyecto.',
    required: true
  },
  {
    id: 'build',
    name: 'Build & Compile',
    description: 'Compilar y validar que el proyecto arranca.',
    required: true
  },
  {
    id: 'testing',
    name: 'Unit Testing',
    description: 'Generar y ejecutar pruebas unitarias.',
    required: true
  },
  {
    id: 'qa',
    name: 'Quality Assurance',
    description: 'Verificar calidad: lint, seguridad y rendimiento.',
    required: true
  },
  {
    id: 'packaging',
    name: 'Packaging',
    description: 'Empaquetar artefactos listos para despliegue.',
    required: true
  },
  {
    id: 'publishing',
    name: 'Publishing',
    description: 'Preparar publicación, despliegue o exportación.',
    required: false
  },
  {
    id: 'versioning',
    name: 'Versioning & Finalization',
    description: 'Actualizar versión, changelog y preparar release.',
    required: true
  }
];

export class WorkflowEngine {
  constructor(phases = workflowPhases) {
    this.phases = phases;
  }

  validatePhaseSequence() {
    return this.phases.map((phase) => phase.id);
  }

  getPhaseById(phaseId) {
    return this.phases.find((phase) => phase.id === phaseId) ?? null;
  }

  getNextPhase(currentPhaseId) {
    const currentIndex = this.phases.findIndex((phase) => phase.id === currentPhaseId);
    if (currentIndex === -1) return this.phases[0];
    return this.phases[currentIndex + 1] ?? null;
  }
}
