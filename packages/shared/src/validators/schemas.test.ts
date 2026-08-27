import { describe, expect, it } from 'vitest';
import { UserSettingsSchema } from './schemas';

describe('schemas validator', () => {
  it('should validate valid user settings', () => {
    const settings = {
      privacyLevel: 'domain-only',
      allowIncognitoTracking: false,
      idleThresholdSeconds: 300,
      heartbeatIntervalSeconds: 30,
      ramThresholdMb: 500,
      ramIdleMinutes: 60,
      dailyDataBudgetMb: 2048,
      theme: 'system',
      breakTheme: 'warm',
    };

    const parsed = UserSettingsSchema.safeParse(settings);
    expect(parsed.success).toBe(true);
  });

  it('should reject invalid privacy level', () => {
    const invalidSettings = {
      privacyLevel: 'invalid-level',
    };

    const parsed = UserSettingsSchema.safeParse(invalidSettings);
    expect(parsed.success).toBe(false);
  });
});
