import { describe, expect, it, vi } from 'vitest';
import { retryWithBackoff } from './async-utils';

describe('async-utils', () => {
  it('should resolve immediately if function succeeds', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const res = await retryWithBackoff(fn, 3, 10);
    expect(res).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry until max attempts if function fails', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('failed'));
    await expect(retryWithBackoff(fn, 3, 10, 1)).rejects.toThrow('failed');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
