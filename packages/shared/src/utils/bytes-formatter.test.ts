import { describe, expect, it } from 'vitest';
import { formatBytes } from './bytes-formatter';

describe('bytes-formatter', () => {
  it('should format bytes into KB, MB, GB', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(1073741824)).toBe('1 GB');
    expect(formatBytes(1572864)).toBe('1.5 MB');
  });
});
