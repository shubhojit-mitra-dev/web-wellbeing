import { z } from 'zod';

export const ActivitySchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  deviceId: z.string(),
  domain: z.string().min(1),
  url: z.string().url().optional(),
  title: z.string().optional(),
  categoryId: z.number().int(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime(),
  durationSeconds: z.number().nonnegative(),
  isIdle: z.boolean(),
  tabCount: z.number().int().nonnegative(),
  windowCount: z.number().int().nonnegative(),
});

export const UserSettingsSchema = z.object({
  privacyLevel: z.enum(['domain-only', 'full-url']),
  allowIncognitoTracking: z.boolean(),
  idleThresholdSeconds: z.number().positive(),
  heartbeatIntervalSeconds: z.number().positive(),
  ramThresholdMb: z.number().positive(),
  ramIdleMinutes: z.number().positive(),
  dailyDataBudgetMb: z.number().positive(),
  theme: z.enum(['system', 'dark', 'light']),
  breakTheme: z.enum(['warm', 'monochrome', 'blur', 'dim']),
});

export const FocusSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  plannedDurationMinutes: z.number().positive().optional(),
  actualDurationSeconds: z.number().nonnegative(),
  mode: z.enum(['focus', 'pomodoro']),
  completed: z.boolean(),
  blockedDomains: z.array(z.string()),
  interruptionCount: z.number().int().nonnegative(),
});
