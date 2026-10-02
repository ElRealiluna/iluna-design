import fs from 'node:fs/promises';
import path from 'node:path';

export class CodeScaffolder {
  async scaffold(project, outputDir = './generated-project') {
    const dir = path.resolve(outputDir);
    await fs.mkdir(dir, { recursive: true });
    await fs.mkdir(path.join(dir, 'src'), { recursive: true });
    await fs.mkdir(path.join(dir, 'tests'), { recursive: true });
    await fs.mkdir(path.join(dir, 'docs'), { recursive: true });

    const packageJson = {
      name: project.slug ?? 'new-project',
      version: '0.1.0',
      private: true,
      type: 'module',
      scripts: {
        start: 'node src/index.js',
        test: 'node --test',
        lint: 'node --check src/*.js',
        build: 'node --check src/*.js'
      },
      dependencies: {}
    };

    const appCode = `export function startApp() {
  return {
    name: '${project.name ?? 'New Project'}',
    status: 'initialized',
    stack: '${project.stack ?? 'generic'}'
  };
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  console.log(startApp());
}
`;

    const testCode = `import test from 'node:test';
import assert from 'node:assert/strict';
import { startApp } from '../src/index.js';

test('app starts with expected object', () => {
  const app = startApp();
  assert.equal(app.status, 'initialized');
  assert.ok(app.name);
});
`;

    const readme = `# ${project.name ?? 'New Project'}\n\nProyecto generado por iluna-design lifecycle orchestrator.\n`;
    const changelog = `# Changelog\n\n## 0.1.0\n- Primer scaffold inicial\n`;

    await fs.writeFile(path.join(dir, 'package.json'), JSON.stringify(packageJson, null, 2));
    await fs.writeFile(path.join(dir, 'src', 'index.js'), appCode);
    await fs.writeFile(path.join(dir, 'tests', 'app.test.js'), testCode);
    await fs.writeFile(path.join(dir, 'README.md'), readme);
    await fs.writeFile(path.join(dir, 'docs', 'project-notes.md'), `# Project Notes\n\n${project.objective ?? 'pending'}\n`);
    await fs.writeFile(path.join(dir, 'CHANGELOG.md'), changelog);

    return {
      outputDir: dir,
      filesCreated: [
        'package.json',
        'src/index.js',
        'tests/app.test.js',
        'README.md',
        'CHANGELOG.md'
      ]
    };
  }
}
