export interface CIJobConfig {
  name: string;
  nodeVersion: string;
  pnpmVersion: string;
  steps: string[];
}

export function validateCIPipelineConfig(config: CIJobConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.name) {
    errors.push('Job name is required');
  }

  if (!config.nodeVersion || !config.nodeVersion.startsWith('20')) {
    errors.push('Node.js version 20.x is required for LTS compatibility');
  }

  if (!config.pnpmVersion) {
    errors.push('pnpm package manager version must be specified');
  }

  const requiredSteps = ['pnpm lint', 'pnpm typecheck', 'pnpm test', 'pnpm test:e2e', 'pnpm build'];
  for (const step of requiredSteps) {
    if (!config.steps.includes(step)) {
      errors.push(`Missing required CI step: ${step}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
