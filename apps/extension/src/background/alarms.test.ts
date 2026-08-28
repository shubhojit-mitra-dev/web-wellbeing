import { describe, expect, it, vi, beforeEach } from 'vitest';
import { setupAlarms, ALARM_NAMES } from './alarms';

describe('background alarms suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates heartbeat and sync batch chrome alarms', () => {
    const createMock = vi.fn();
    const addListenerMock = vi.fn();

    vi.stubGlobal('chrome', {
      alarms: {
        create: createMock,
        onAlarm: {
          addListener: addListenerMock,
        },
      },
    });

    setupAlarms();

    expect(createMock).toHaveBeenCalledWith(ALARM_NAMES.HEARTBEAT, { periodInMinutes: 0.5 });
    expect(createMock).toHaveBeenCalledWith(ALARM_NAMES.SYNC_BATCH, { periodInMinutes: 5.0 });
    expect(addListenerMock).toHaveBeenCalled();
  });
});
