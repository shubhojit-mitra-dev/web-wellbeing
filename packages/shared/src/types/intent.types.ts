export type IntentActionType = 'watch' | 'read' | 'write' | 'code' | 'review' | 'other';

export interface ParsedIntent {
  readonly action: IntentActionType;
  readonly domain?: string;
  readonly description: string;
  readonly estimatedMinutes?: number;
}

export interface DailyIntent {
  readonly id: string;
  readonly userId: string;
  readonly date: string;
  readonly rawInput: string;
  readonly parsedIntents: readonly ParsedIntent[];
  readonly alignmentScore?: number;
  readonly createdAt: string;
}

export interface IntentAlignmentResult {
  readonly date: string;
  readonly totalIntents: number;
  readonly matchedIntents: number;
  readonly score: number;
  readonly feedbackMarkdown: string;
}
