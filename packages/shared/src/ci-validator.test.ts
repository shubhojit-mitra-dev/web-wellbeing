import { describe, it, expect } from 'vitest';
import { validateCIPipelineConfig, type CIJobConfig } from './ci-validator';

describe('validateCIPipelineConfig suite', () => {
  it('validates a complete, valid CI pipeline configuration', () => {
    const validConfig: CIJobConfig = {
      name: 'Validate PR',
      nodeVersion: '20.x',
      pnpmVersion: '10.27.0',
      steps: ['pnpm lint', 'pnpm typecheck', 'pnpm test', 'pnpm test:e2e', 'pnpm build'],
    };

    const result = validateCIPipelineConfig(validConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects pipeline configuration missing required test steps', () => {
    const incompleteConfig: CIJobConfig = {
      name: 'Validate PR',
      nodeVersion: '20.x',
      pnpmVersion: '10.27.0',
      steps: ['pnpm lint'],
    };

    const result = validateCIPipelineConfig(incompleteConfig);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing required CI step: pnpm typecheck');
    expect(result.errors).toContain('Missing required CI step: pnpm test');
  });

  it('rejects non-Node 20 versions', () => {
    const invalidNodeConfig: CIJobConfig = {
      name: 'Validate PR',
      nodeVersion: '16.x',
      pnpmVersion: '10.27.0',
      steps: ['pnpm lint', 'pnpm typecheck', 'pnpm test', 'pnpm test:e2e', 'pnpm build'],
    };

    const result = validateCIPipelineConfig(invalidNodeConfig);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Node.js version 20.x is required for LTS compatibility');
  });
});
