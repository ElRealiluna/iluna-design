import { DesignAgent } from './design-agent.js';
import { CodeAgent } from './code-agent.js';

const designKeywords = [
  'landing', 'ui', 'ux', 'diseño', 'design', 'layout', 'polish', 'hero', 'hero section',
  'paleta', 'color', 'tipografía', 'typography', 'accesibilidad', 'contrast', 'spacing',
  'visual', 'hierarchy', 'dashboard', 'checkout', 'formulario', 'cta', 'mobile', 'responsive'
];

const codeKeywords = [
  'bug', 'error', 'refactor', 'api', 'frontend', 'backend', 'component', 'state', 'logic',
  'codigo', 'funcionalidad', 'login', 'auth', 'routing', 'performance', 'test', 'build', 'hook',
  'react', 'next', 'vite', 'render', 'form', 'validación', 'feature'
];

export class Orchestrator {
  constructor() {
    this.designAgent = new DesignAgent();
    this.codeAgent = new CodeAgent();
  }

  route(task) {
    const normalized = task.toLowerCase();

    const designMatch = designKeywords.some((keyword) => normalized.includes(keyword));
    const codeMatch = codeKeywords.some((keyword) => normalized.includes(keyword));

    if (designMatch && codeMatch) {
      return { primary: 'design', secondary: 'code', mode: 'hybrid' };
    }

    if (designMatch) {
      return { primary: 'design', secondary: null, mode: 'design-only' };
    }

    if (codeMatch) {
      return { primary: 'code', secondary: null, mode: 'code-only' };
    }

    return { primary: 'design', secondary: 'code', mode: 'balanced-default' };
  }

  async execute(task) {
    const route = this.route(task);
    const delegates = [];

    if (route.primary === 'design') {
      delegates.push(await this.designAgent.execute(task));
    } else {
      delegates.push(await this.codeAgent.execute(task));
    }

    if (route.secondary === 'code') {
      delegates.push(await this.codeAgent.execute(task));
    }

    if (route.secondary === 'design') {
      delegates.push(await this.designAgent.execute(task));
    }

    return {
      task,
      route,
      strategy: 'delegated execution',
      delegates,
      summary: `Se delegó la tarea a ${delegates.map((item) => item.agent).join(' + ')}.`
    };
  }
}
