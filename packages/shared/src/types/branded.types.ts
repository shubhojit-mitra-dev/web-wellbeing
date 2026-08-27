declare const __brand: unique symbol;

export type Brand<T, B> = T & { readonly [__brand]: B };

export type UserId = Brand<string, 'UserId'>;
export type DeviceId = Brand<string, 'DeviceId'>;
export type SessionId = Brand<string, 'SessionId'>;
export type ActivityId = Brand<string, 'ActivityId'>;
export type CategoryId = Brand<number, 'CategoryId'>;

export function makeUserId(id: string): UserId {
  return id as UserId;
}

export function makeDeviceId(id: string): DeviceId {
  return id as DeviceId;
}

export function makeSessionId(id: string): SessionId {
  return id as SessionId;
}

export function makeActivityId(id: string): ActivityId {
  return id as ActivityId;
}

export function makeCategoryId(id: number): CategoryId {
  return id as CategoryId;
}
