import { describe, expect, it } from 'vitest';
import * as TrackingModule from './index';

describe('Tracking Engine Module Verification', () => {
  it('should export all tracking engine modules', () => {
    expect(TrackingModule.TabObserver).toBeDefined();
    expect(TrackingModule.WindowTracker).toBeDefined();
    expect(TrackingModule.IdleDetector).toBeDefined();
    expect(TrackingModule.HeartbeatManager).toBeDefined();
    expect(TrackingModule.ContentObserver).toBeDefined();
    expect(TrackingModule.TrackingEngine).toBeDefined();
  });
});
