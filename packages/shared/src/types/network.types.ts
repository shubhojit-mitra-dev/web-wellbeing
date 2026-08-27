export interface DomainBandwidth {
  readonly domain: string;
  readonly bytesSent: number;
  readonly bytesReceived: number;
  readonly requestCount: number;
}

export interface NetworkUsage {
  readonly id: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly domains: readonly DomainBandwidth[];
  readonly totalBytes: number;
  readonly recordedAt: string;
}

export interface DataBudget {
  readonly dailyLimitBytes: number;
  readonly currentBytes: number;
  readonly warningThresholdPercent: number;
  readonly isWarningTriggered: boolean;
  readonly isLimitExceeded: boolean;
}

export interface DataBudgetAlert {
  readonly level: 'warning' | 'exceeded';
  readonly currentUsageBytes: number;
  readonly limitBytes: number;
  readonly topConsumers: readonly DomainBandwidth[];
}
