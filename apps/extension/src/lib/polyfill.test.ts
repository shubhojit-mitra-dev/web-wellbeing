import { describe, expect, it } from 'vitest';
import './polyfill';

describe('global polyfills suite', () => {
  it('defines process.env on globalThis when process is undefined', () => {
    expect(globalThis.process).toBeDefined();
    expect(globalThis.process.env).toBeDefined();
  });
});
