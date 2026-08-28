import type { ActivityRecord } from '@web-wellbeing/shared';
import { parseDomain } from '@web-wellbeing/shared';

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

  return {
    domain,
    url: session.url,
    title: session.title,
    startedAt: session.startedAt.getTime(),
    endedAt: endedAt.getTime(),
    isIdle,
  };
}
