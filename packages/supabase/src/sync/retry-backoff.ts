export interface RetryConfig {
  readonly initialDelayMs: number;
  readonly maxDelayMs: number;
  readonly backoffFactor: number;
  readonly maxAttempts: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  initialDelayMs: 1000,
  maxDelayMs: 60000,
  backoffFactor: 2,
  maxAttempts: 5,
};

export class ExponentialBackoffManager {
  private attempt = 0;

  constructor(private readonly config: RetryConfig = DEFAULT_RETRY_CONFIG) {}

  calculateDelay(): number {
    const delay = this.config.initialDelayMs * Math.pow(this.config.backoffFactor, this.attempt);
    return Math.min(delay, this.config.maxDelayMs);
  }

  recordAttempt(): number {
    const delay = this.calculateDelay();
    this.attempt++;
    return delay;
  }

  shouldRetry(): boolean {
    return this.attempt < this.config.maxAttempts;
  }

  reset(): void {
    this.attempt = 0;
  }

  get currentAttempt(): number {
    return this.attempt;
  }
}
