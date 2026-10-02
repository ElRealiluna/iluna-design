export const projectQuestions = {
  intake: [
    {
      id: 'project_type',
      question: '¿Qué tipo de proyecto deseas crear?',
      type: 'select',
      options: [
        'landing_page',
        'saas_b2b',
        'saas_b2c',
        'ecommerce',
        'dashboard_admin',
        'marketplace',
        'mobile_app',
        'ai_app',
        'webapp_compleja',
        'mvp_interno',
        'otro'
      ],
      critical: true
    },
    {
      id: 'main_objective',
      question: '¿Cuál es el objetivo principal?',
      type: 'text',
      examples: ['Vender productos online', 'Captar leads', 'Automatizar procesos internos'],
      critical: true
    },
    {
      id: 'target_users',
      question: '¿Quiénes son los usuarios principales?',
      type: 'select',
      options: [
        'clientes_finales',
        'empleados_internos',
        'tecnicos',
        'empresas',
        'particulares',
        'mixto'
      ],
      critical: true
    }
  ],

  requirements: [
    {
      id: 'complexity_level',
      question: '¿Qué nivel de complejidad técnica tiene?',
      type: 'select',
      options: ['simple', 'media', 'alta', 'muy_alta_con_ia'],
      critical: true
    },
    {
      id: 'expected_users',
      question: '¿Cuántos usuarios activos esperas en el primer año?',
      type: 'select',
      options: ['< 100', '100-1k', '1k-10k', '10k-100k', '> 100k'],
      critical: false
    },
    {
      id: 'has_authentication',
      question: '¿Necesita autenticación de usuarios?',
      type: 'select',
      options: ['no', 'email_password', 'oauth', 'sso', 'multirrol'],
      critical: true
    },
    {
      id: 'has_payments',
      question: '¿Necesita procesamiento de pagos?',
      type: 'select',
      options: ['no', 'stripe', 'billing_suscripciones', 'ambos'],
      critical: true
    },
    {
      id: 'has_ai',
      question: '¿Necesita integración con IA?',
      type: 'select',
      options: ['no', 'openai_api', 'rag', 'agentes_autonomos', 'custom_ml'],
      critical: false
    },
    {
      id: 'has_integrations',
      question: '¿Necesita integraciones con terceros?',
      type: 'text',
      examples: ['CRM, ERP, WhatsApp, Email, APIs'],
      critical: false
    },
    {
      id: 'data_complexity',
      question: '¿Qué tan compleja es la gestión de datos?',
      type: 'select',
      options: ['simple_crud', 'relacional_complejo', 'tiempo_real', 'big_data', 'grafos'],
      critical: false
    }
  ],

  constraints: [
    {
      id: 'timeline',
      question: '¿Cuál es tu timeline esperado?',
      type: 'select',
      options: ['2_semanas', '1_mes', '3_meses', '6_meses', 'flexible'],
      critical: true
    },
    {
      id: 'team_size',
      question: '¿Cuántas personas trabajarán en el proyecto?',
      type: 'select',
      options: ['1_person', '2_3_persons', '4_6_persons', '7_10_persons', '> 10'],
      critical: true
    },
    {
      id: 'team_experience',
      question: '¿Experiencia técnica del equipo?',
      type: 'select',
      options: ['junior', 'mid_level', 'senior', 'mixta'],
      critical: true
    },
    {
      id: 'existing_tech',
      question: '¿Hay tecnología o backend ya existente?',
      type: 'text',
      examples: ['API en Node.js', 'Base de datos PostgreSQL ya creada', 'Nada'],
      critical: false
    },
    {
      id: 'budget_priority',
      question: '¿Qué es más importante: velocidad o costo?',
      type: 'select',
      options: ['velocidad_maxima', 'balance', 'minimizar_costos'],
      critical: false
    }
  ],

  success: [
    {
      id: 'success_criteria',
      question: '¿Qué define el éxito del proyecto?',
      type: 'text',
      examples: ['Mejor UX', 'Lanzamiento rápido', 'Fácil de mantener', 'Alto rendimiento'],
      critical: true
    },
    {
      id: 'maintenance_strategy',
      question: '¿Qué tipo de mantenimiento se espera?',
      type: 'select',
      options: ['proyecto_unico', 'mantenimiento_continuo', 'mvp_escalable'],
      critical: false
    }
  ]
};
