import type { ActivityRecord } from '@web-wellbeing/shared';

export class ConflictResolver {
  resolveLastWriteWins(localRecord: ActivityRecord, remoteRecord: ActivityRecord): ActivityRecord {
    if (localRecord.endedAt >= remoteRecord.endedAt) {
      return localRecord;
    }
    return remoteRecord;
  }

  mergeActivities(
    localList: readonly ActivityRecord[],
    remoteList: readonly ActivityRecord[],
  ): ActivityRecord[] {
    const recordMap = new Map<string, ActivityRecord>();

    for (const rec of remoteList) {
      recordMap.set(rec.domain, rec);
    }

    for (const localRec of localList) {
      const existing = recordMap.get(localRec.domain);
      if (!existing) {
        recordMap.set(localRec.domain, localRec);
      } else {
        const resolved = this.resolveLastWriteWins(localRec, existing);
        recordMap.set(localRec.domain, resolved);
      }
    }

    return Array.from(recordMap.values());
  }
}
