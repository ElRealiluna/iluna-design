import { Orchestrator } from './agents/orchestrator.js';

const prompt = process.argv.slice(2).join(' ') || 'Diseña una landing page premium para una app SaaS de IA y también corrige el flujo de login';

const orchestrator = new Orchestrator();
const result = await orchestrator.execute(prompt);

console.log(JSON.stringify(result, null, 2));
