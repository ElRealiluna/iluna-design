import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export class BuildEngine {
  async compile(projectDir) {
    const packageJsonPath = path.join(projectDir, 'package.json');
    let packageJson;
    try {
      packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    } catch {
      return {
        status: 'skipped',
        reason: 'No package.json found in project directory',
        outputDir: projectDir
      };
    }

    try {
      await execFileAsync('node', ['--check', path.join(projectDir, 'src', 'index.js')], { cwd: projectDir });
      return {
        status: 'success',
        outputDir: projectDir,
        packageName: packageJson.name,
        message: 'Compilación sintáctica exitosa'
      };
    } catch (error) {
      return {
        status: 'failed',
        outputDir: projectDir,
        error: error.stderr || error.message,
        message: 'La compilación falló'
      };
    }
  }
}
