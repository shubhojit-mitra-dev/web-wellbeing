import type { ActivityRecord } from '@web-wellbeing/shared';
import { parseDomain, resolveCategoryId } from '@web-wellbeing/shared';

export interface RawTabSession {
  url: string;
  title: string;
  startedAt: Date;
}

export function createActivityRecord(
  session: RawTabSession,
  endedAt: Date = new Date(),
  isIdle = false,
): ActivityRecord {
  const domain = parseDomain(session.url);
  const categoryId = resolveCategoryId(domain);
  const durationSeconds = Math.max(
    0,
    Math.floor((endedAt.getTime() - session.startedAt.getTime()) / 1000),
  );

  return {
    id: crypto.randomUUID(),
    userId: 'local-user',
    deviceId: 'local-device',
    domain,
    url: session.url,
    title: session.title,
    categoryId,
    startedAt: session.startedAt.toISOString(),
    endedAt: endedAt.toISOString(),
    durationSeconds,
    isIdle,
    tabCount: 1,
    windowCount: 1,
  };
}
