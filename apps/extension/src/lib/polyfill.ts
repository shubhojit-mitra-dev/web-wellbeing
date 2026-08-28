if (typeof globalThis.process === 'undefined') {
  (globalThis as unknown as Record<string, unknown>).process = { env: {} };
}
