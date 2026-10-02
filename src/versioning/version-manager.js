export class VersionManager {
  constructor() {
    this.version = '0.1.0';
  }

  bump(type = 'patch') {
    const [major, minor, patch] = this.version.split('.').map(Number);
    const nextVersion = {
      patch: [major, minor, patch + 1],
      minor: [major, minor + 1, 0],
      major: [major + 1, 0, 0]
    }[type] ?? [major, minor, patch + 1];

    this.version = nextVersion.join('.');
    return this.version;
  }

  generateChangelog() {
    return {
      version: this.version,
      changelog: [
        '## ' + this.version,
        '- Iniciación del ciclo de vida y scaffold inicial',
        '- Pruebas y QA básicos generados',
        '- Preparación para publicación y versionado'
      ].join('\n')
    };
  }
}
