import { TestInfo } from '@playwright/test';

export function feature(testInfo: TestInfo, name: string): void {
  testInfo.annotations.push({ type: 'feature', description: name });
}

export function story(testInfo: TestInfo, name: string): void {
  testInfo.annotations.push({ type: 'story', description: name });
}

export function severity(testInfo: TestInfo, level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
  testInfo.annotations.push({ type: 'severity', description: level });
}