import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export class WorkflowState {
  constructor(projectId = null) {
    this.projectId = projectId ?? crypto.randomUUID();
    this.state = {
      projectId: this.projectId,
      status: 'draft',
      currentPhase: null,
      phases: {},
      artifacts: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '0.1.0'
    };
  }

  markPhase(phaseId, status, details = {}) {
    this.state.phases[phaseId] = {
      status,
      ...details,
      updatedAt: new Date().toISOString()
    };
    this.state.currentPhase = phaseId;
    this.state.updatedAt = new Date().toISOString();
    return this.state;
  }

  addArtifact(key, value) {
    this.state.artifacts[key] = value;
    this.state.updatedAt = new Date().toISOString();
    return this.state;
  }

  setStatus(status) {
    this.state.status = status;
    this.state.updatedAt = new Date().toISOString();
    return this.state;
  }

  toJSON() {
    return this.state;
  }

  async saveToFile(baseDir) {
    const statePath = path.join(baseDir, 'workflow-state.json');
    await fs.mkdir(baseDir, { recursive: true });
    await fs.writeFile(statePath, JSON.stringify(this.state, null, 2));
    return statePath;
  }
}
