import { DecisionEngine } from '../analysis/decision-engine.js';

export class RequirementsEngine {
  constructor() {
    this.decisionEngine = new DecisionEngine();
  }

  analyze(prompt) {
    const text = (prompt ?? '').trim();
    const normalized = text.toLowerCase();

    const typeHints = {
      landing_page: ['landing page', 'landing', 'marketing', 'web corporativa', 'pagina de venta', 'sitio web'],
      saas_b2b: ['saas', 'software como servicio', 'dashboards', 'panel', 'crm', 'admin'],
      ecommerce: ['ecommerce', 'tienda online', 'shop', 'carrito', 'checkout'],
      ai_app: ['ia', 'ai', 'chatbot', 'asistente', 'agente', 'llm'],
      marketplace: ['marketplace', 'plataforma de vendedores', 'catalogo', 'vendedores'],
      dashboard_admin: ['admin', 'dashboard', 'panel administrativo', 'backoffice'],
      mvp_interno: ['herramienta interna', 'intranet', 'administrativo interno', 'operativo']
    };

    let projectType = 'saas_b2b';
    for (const [type, hints] of Object.entries(typeHints)) {
      if (hints.some((hint) => normalized.includes(hint))) {
        projectType = type;
        break;
      }
    }

    const requirements = {
      originalPrompt: text,
      projectType,
      objective: this.extractObjective(text),
      targetUsers: this.extractTargetUsers(text),
      users: this.extractUsers(text),
      stackPreference: this.extractStackPreference(text),
      constraints: this.extractConstraints(text),
      expectedFeatures: this.extractFeatures(text),
      needs: {
        auth: /login|auth|usuarios|roles|sesiones/.test(normalized),
        payments: /pago|stripe|suscripcion|checkout|billing/.test(normalized),
        ai: /ia|ai|openai|llm|chat|agente|copilot/.test(normalized),
        integrations: /api|crm|erp|whatsapp|slack|google|integracion/.test(normalized)
      },
      createdAt: new Date().toISOString()
    };

    return requirements;
  }

  extractObjective(text) {
    if (!text) return 'Proyecto digital con objetivo de negocio claro';
    return text.length > 140 ? text.slice(0, 140) + '...' : text;
  }

  extractTargetUsers(text) {
    const normalized = text.toLowerCase();
    if (/(clientes|usuarios finales|publico)/.test(normalized)) return 'usuarios finales';
    if (/(empleados|internos|equipo)/.test(normalized)) return 'equipo interno';
    if (/(empresas|b2b|negocios)/.test(normalized)) return 'empresas';
    return 'usuarios generales';
  }

  extractUsers(text) {
    const normalized = text.toLowerCase();
    if (/(cliente|usuarios|publico)/.test(normalized)) return 'clientes';
    return 'equipo y usuarios';
  }

  extractStackPreference(text) {
    const normalized = text.toLowerCase();
    const mapping = {
      react: /react/.test(normalized),
      nextjs: /next.js|nextjs|next/.test(normalized),
      vue: /vue/.test(normalized),
      fastapi: /fastapi|python/.test(normalized),
      node: /node|express|nestjs/.test(normalized),
      dotnet: /dotnet|aspnet|blazor/.test(normalized)
    };

    const found = Object.entries(mapping).find(([, value]) => value);
    return found ? found[0] : 'auto';
  }

  extractConstraints(text) {
    const normalized = text.toLowerCase();
    const constraints = [];

    if (/rapido|urgente|mvp|pronto/.test(normalized)) constraints.push('deadline ajustado');
    if (/seguro|privado|cumple|gdpr|legal/.test(normalized)) constraints.push('seguridad y compliance');
    if (/ia|ai|openai/.test(normalized)) constraints.push('integración con IA');
    if (/mobile|movil|app/.test(normalized)) constraints.push('soporte móvil');

    return constraints.length > 0 ? constraints : ['sin restricciones explícitas'];
  }

  extractFeatures(text) {
    const normalized = text.toLowerCase();
    const features = [];
    if (/login|auth/.test(normalized)) features.push('autenticación');
    if (/pago|suscripcion|checkout/.test(normalized)) features.push('pagos');
    if (/report|dashboard|analitica/.test(normalized)) features.push('analytics');
    if (/chat|assistant|ia/.test(normalized)) features.push('asistente de IA');
    if (/api|integracion/.test(normalized)) features.push('integraciones');
    return features.length > 0 ? features : ['funcionalidad principal'];
  }
}
