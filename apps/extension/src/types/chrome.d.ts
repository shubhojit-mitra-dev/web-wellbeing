/// <reference types="chrome" />
/// <reference types="webextension-polyfill" />

declare namespace chrome.processes {
  export interface ProcessInfo {
    id: number;
    cpu?: number;
    network?: number;
    privateMemory?: number;
    jsMemoryAllocated?: number;
    jsMemoryUsed?: number;
  }

  export function getProcessInfo(
    processIds: number[],
    callback: (processes: Record<number, ProcessInfo>) => void,
  ): void;
}
