/**
 * Stack recommendations based on project profile
 */
export const stackRecommendations = {
  landing_page: {
    name: 'Landing Page / Marketing Site',
    description: 'Enfoque en velocidad, SEO y conversión',
    stacks: [
      {
        name: 'Fast & Modern',
        priority: 'speed',
        frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui'],
        backend: 'none',
        database: 'none',
        hosting: 'Vercel',
        extra: ['Framer Motion para animaciones', 'Contentful o MDX para contenido'],
        timeline: '2-3 semanas',
        cost: 'bajo'
      },
      {
        name: 'SEO Oriented',
        priority: 'seo',
        frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
        backend: 'none',
        database: 'none',
        cms: 'Contentful / Strapi',
        hosting: 'Vercel',
        extra: ['Schema.org', 'Analytics'],
        timeline: '3-4 semanas',
        cost: 'bajo'
      }
    ]
  },

  saas_b2b: {
    name: 'SaaS B2B',
    description: 'Enfoque en productividad, permisos y roles',
    stacks: [
      {
        name: 'Full Stack Moderno',
        priority: 'balance',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS', 'Shadcn/ui'],
        backend: 'Next.js API Routes o FastAPI',
        database: 'PostgreSQL + Prisma',
        auth: 'Clerk o Auth.js',
        hosting: 'Vercel + Supabase',
        extra: ['Redis para cache', 'Webhooks', 'Email transaccional'],
        timeline: '6-8 semanas',
        cost: 'medio'
      },
      {
        name: 'Enterprise Ready',
        priority: 'security',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS'],
        backend: 'NestJS',
        database: 'PostgreSQL + TypeORM',
        auth: 'Auth0 o Okta',
        hosting: 'AWS ECS o Railway',
        extra: ['Audit logs', 'SSO', 'Rate limiting', 'Observability'],
        timeline: '8-12 semanas',
        cost: 'alto'
      }
    ]
  },

  ecommerce: {
    name: 'E-commerce',
    description: 'Enfoque en conversión, pagos y UX',
    stacks: [
      {
        name: 'Solución Rápida',
        priority: 'speed',
        frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
        backend: 'Shopify API / WooCommerce',
        database: 'Shopify managed',
        payments: 'Stripe',
        hosting: 'Vercel',
        extra: ['Product catalog', 'Checkout optimizado', 'Analytics'],
        timeline: '4-6 semanas',
        cost: 'bajo-medio'
      },
      {
        name: 'Custom Completo',
        priority: 'customization',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS'],
        backend: 'Node.js Express o NestJS',
        database: 'PostgreSQL',
        payments: 'Stripe + webhook handling',
        hosting: 'Vercel + managed DB',
        extra: ['Inventory management', 'Order tracking', 'Email marketing'],
        timeline: '10-14 semanas',
        cost: 'medio-alto'
      }
    ]
  },

  dashboard_admin: {
    name: 'Dashboard / Admin Panel',
    description: 'Enfoque en funcionalidad, datos y velocidad',
    stacks: [
      {
        name: 'Simple & Fast',
        priority: 'speed',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS', 'TanStack Table'],
        backend: 'Next.js API Routes',
        database: 'PostgreSQL + Prisma',
        auth: 'Clerk',
        hosting: 'Vercel',
        extra: ['Real-time updates con WebSockets opcionales'],
        timeline: '5-7 semanas',
        cost: 'bajo'
      }
    ]
  },

  ai_app: {
    name: 'Aplicación con IA',
    description: 'Enfoque en APIs externas, prompts y velocidad',
    stacks: [
      {
        name: 'IA + OpenAI',
        priority: 'speed',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS'],
        backend: 'Next.js API Routes',
        database: 'PostgreSQL + Prisma',
        ai: 'OpenAI API',
        storage: 'Supabase Storage o S3',
        hosting: 'Vercel',
        extra: ['Streaming responses', 'Rate limiting', 'Monitoring de costos'],
        timeline: '6-8 semanas',
        cost: 'medio'
      },
      {
        name: 'RAG + Vector DB',
        priority: 'advanced',
        frontend: ['Next.js 14', 'TypeScript', 'React Query'],
        backend: 'Node.js Express o FastAPI',
        database: 'PostgreSQL + pgvector',
        ai: 'OpenAI API + Embeddings',
        storage: 'S3 o Supabase',
        hosting: 'AWS o Railway',
        extra: ['Document processing', 'Vector search', 'Chunking strategy'],
        timeline: '10-12 semanas',
        cost: 'alto'
      }
    ]
  },

  marketplace: {
    name: 'Marketplace',
    description: 'Enfoque en dos roles, pagos complejos y escalabilidad',
    stacks: [
      {
        name: 'Marketplace Moderno',
        priority: 'scalability',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS'],
        backend: 'NestJS',
        database: 'PostgreSQL + Redis',
        payments: 'Stripe Connect',
        search: 'Elasticsearch o Meilisearch',
        hosting: 'AWS ECS o Railway',
        extra: ['Messaging entre usuarios', 'Reviews', 'Notifications en tiempo real'],
        timeline: '12-16 semanas',
        cost: 'alto'
      }
    ]
  },

  mvp_interno: {
    name: 'MVP Interno',
    description: 'Enfoque en velocidad extrema, scope mínimo',
    stacks: [
      {
        name: 'Prototipo Rápido',
        priority: 'speed',
        frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
        backend: 'Next.js API Routes',
        database: 'PostgreSQL o SQLite',
        auth: 'Simple email/password o Clerk',
        hosting: 'Vercel',
        extra: ['Documentación mínima', 'Sin testing completo'],
        timeline: '2-3 semanas',
        cost: 'muy_bajo'
      }
    ]
  }
};

export class StackRecommender {
  recommend(projectProfile) {
    const { projectType, complexity, risks, priorities, constraints } = projectProfile;
    const recommendations = stackRecommendations[projectType];

    if (!recommendations) {
      return this.getDefaultStack(complexity, priorities);
    }

    // Select best stack based on priorities
    let selectedStack = recommendations.stacks[0];

    if (priorities.includes('speed') && recommendations.stacks.length > 1) {
      selectedStack = recommendations.stacks.find(s => s.priority === 'speed') || recommendations.stacks[0];
    }

    if (priorities.includes('security') && recommendations.stacks.length > 1) {
      selectedStack = recommendations.stacks.find(s => s.priority === 'security' || s.priority === 'enterprise') || recommendations.stacks[0];
    }

    if (priorities.includes('scalability') && recommendations.stacks.length > 1) {
      selectedStack = recommendations.stacks.find(s => s.priority === 'scalability') || recommendations.stacks[0];
    }

    return {
      projectType: recommendations.name,
      description: recommendations.description,
      selectedStack,
      alternatives: recommendations.stacks.filter(s => s !== selectedStack),
      reasoning: this.generateReasoning(selectedStack, risks, priorities)
    };
  }

  generateReasoning(stack, risks, priorities) {
    const reasons = [];

    reasons.push(`Stack seleccionado por prioridad: ${stack.priority}`);

    if (risks.length > 0) {
      reasons.push(`Se consideraron ${risks.length} riesgos identificados`);
    }

    reasons.push(`Frontend: ${stack.frontend.join(', ')}`);
    reasons.push(`Backend: ${stack.backend}`);
    reasons.push(`Database: ${stack.database}`);

    return reasons;
  }

  getDefaultStack(complexity, priorities) {
    return {
      projectType: 'Proyecto Personalizado',
      selectedStack: {
        name: 'Full Stack Flexible',
        priority: 'balance',
        frontend: ['Next.js 14', 'TypeScript', 'React Query', 'Tailwind CSS'],
        backend: 'Next.js API Routes',
        database: 'PostgreSQL + Prisma',
        hosting: 'Vercel',
        timeline: '6-8 semanas',
        cost: 'medio'
      },
      reasoning: ['Stack general que funciona para la mayoría de casos']
    };
  }
}
