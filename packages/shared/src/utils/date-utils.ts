export function getUtcIsoDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0] ?? '';
}

export function getStartOfDayUtc(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export function getEndOfDayUtc(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setUTCHours(23, 59, 59, 999);
  return d;
}

export function getPastDaysDateStrings(count: number): readonly string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    dates.push(getUtcIsoDateString(d));
  }
  return dates;
}
