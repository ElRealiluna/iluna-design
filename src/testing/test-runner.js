import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export class TestRunner {
  async run(projectDir) {
    const testDir = path.join(projectDir, 'tests');
    try {
      const entries = await fs.readdir(testDir);
      if (!entries.length) {
        return {
          status: 'success',
          total: 0,
          passed: 0,
          skipped: 0,
          message: 'No hay tests creados, pero el flujo respondió correctamente'
        };
      }

      const { stdout, stderr } = await execFileAsync('node', ['--test', testDir], { cwd: projectDir });

      return {
        status: 'success',
        total: entries.length,
        passed: entries.length,
        output: stdout,
        stderr
      };
    } catch (error) {
      return {
        status: 'failed',
        error: error.stderr || error.message,
        output: error.stdout || '',
        message: 'Las pruebas fallaron'
      };
    }
  }
}
