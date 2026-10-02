import fs from 'node:fs/promises';
import path from 'node:path';

export class Packager {
  async package(projectDir, packageName = 'generated-app') {
    const distDir = path.join(projectDir, 'dist');
    await fs.mkdir(distDir, { recursive: true });

    const manifest = {
      name: packageName,
      version: '0.1.0',
      generatedAt: new Date().toISOString(),
      files: ['src/index.js', 'tests/app.test.js', 'README.md']
    };

    const dockerFile = `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install --omit=dev\nCMD ["node", "src/index.js"]\n`;

    await fs.writeFile(path.join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    await fs.writeFile(path.join(projectDir, 'Dockerfile'), dockerFile);

    return {
      status: 'success',
      outputDir: distDir,
      artifact: 'dist/manifest.json',
      dockerfile: 'Dockerfile',
      message: 'Empaquetado preparado para despliegue'
    };
  }
}
