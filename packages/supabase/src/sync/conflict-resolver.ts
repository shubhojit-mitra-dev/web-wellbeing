import type { ActivityRecord } from '@web-wellbeing/shared';

export class ConflictResolver {
  resolveLastWriteWins(localRecord: ActivityRecord, remoteRecord: ActivityRecord): ActivityRecord {
    const localTime = new Date(localRecord.endedAt).getTime();
    const remoteTime = new Date(remoteRecord.endedAt).getTime();

    if (localTime >= remoteTime) {
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
      recordMap.set(rec.id, rec);
    }

    for (const localRec of localList) {
      const existing = recordMap.get(localRec.id);
      if (!existing) {
        recordMap.set(localRec.id, localRec);
      } else {
        const resolved = this.resolveLastWriteWins(localRec, existing);
        recordMap.set(localRec.id, resolved);
      }
    }

    return Array.from(recordMap.values());
  }
}
