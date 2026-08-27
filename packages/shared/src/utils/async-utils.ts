export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 500,
  factor = 2,
): Promise<T> {
  let currentDelay = delayMs;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= factor;
    }
  }
  throw new Error('Retry failed');
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  waitMs: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, waitMs);
  };
}
