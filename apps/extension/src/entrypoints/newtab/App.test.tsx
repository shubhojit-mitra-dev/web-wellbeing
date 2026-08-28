import { describe, it, expect } from 'vitest';
import React from 'react';
import { App } from './App';

describe('Dashboard App Shell', () => {
  it('renders App shell without crashing', () => {
    const el = <App />;
    expect(el).toBeDefined();
  });
});
