# Project Orchestrator

**El orquestador que hace preguntas inteligentes antes de recomendar stack y metodología.**

## ¿Qué es?

Este agente NO empieza a generar código. Primero:

1. **Hace preguntas** sobre el proyecto (tipo, objetivo, usuarios, restricciones)
2. **Analiza crítico** los trade-offs técnicos y de negocio
3. **Identifica riesgos** específicos
4. **Recomienda** stack tecnológico + metodología + roadmap
5. **Valida** antes de proceder a la ejecución

## Flujo

```
User: "Quiero crear una app SaaS"
  ↓
Intake (3 preguntas clave)
  ↓
Questionnaire (14 preguntas por fase)
  ↓
Decision Engine (análisis de complejidad + riesgos)
  ↓
Recommendations (stack + metodología)
  ↓
Report (resumen ejecutivo + roadmap + next steps)
  ↓
Validation (¿aprobado para proceder?)
```

## Uso

```bash
node src/project-orchestrator-cli.js
```

## Módulos

### `questionnaire/`
- `questions.js` - Base de datos de preguntas por fase
- `engine.js` - Motor que guía el cuestionario

### `analysis/`
- `decision-engine.js` - Analiza respuestas, calcula complejidad, identifica riesgos

### `recommendations/`
- `stack-recommender.js` - Recomienda tecnología por tipo de proyecto
- `methodology-recommender.js` - Selecciona metodología de trabajo
- `report-generator.js` - Genera reporte ejecutivo completo

## Ejemplo de Salida

```
📊 RESUMEN EJECUTIVO
Tipo: SaaS B2B
Complejidad: 3/5
Timeline: 6-8 semanas
Equipo: 2-3 developers + designer

🔧 STACK TÉCNICO
Frontend: Next.js 14 + TypeScript + React Query + Tailwind CSS
Backend: Next.js API Routes
Database: PostgreSQL + Prisma
Auth: Clerk
Hosting: Vercel

📅 ROADMAP
1. Sprint 0: Setup (2-3 días)
2. Sprint 1: MVP Core (2 semanas)
3. Sprint 2: Polish & Launch (1 semana)

⚠️ RIESGOS
- Permisos complejos con equipo mid-level
  → Mitigation: Senior architect para design, mid-level para implementation

🎯 NEXT STEPS
1. Validar recomendación
2. Crear repository
3. Setup CI/CD
4. Iniciar Sprint 0
```

## Cómo se Integra

Este `project-orchestrator` es **el agente entrada** para tu `iluna-design`:

1. Usuario dice: "Quiero crear una app"
2. Project Orchestrator hace intake + análisis
3. Recomienda stack (por ej: Next.js + Tailwind)
4. Recomienda metodología (por ej: Design First)
5. Se lo entrega al **design-agent** y **code-agent** para ejecución

## Extensiones Futuras

- Guardar perfil de proyecto en JSON
- Generar Dockerfile + GitHub Actions automáticamente
- Crear proyecto en GitHub
- Inicializar Next.js project con stack recomendado
- Crear Figma file con design system
- Generar first sprint automáticamente
