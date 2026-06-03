import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,

  timeout: 60_000,
  expect: { timeout: 10_000 },

  retries: process.env.CI ? 1 : 0,
  //workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
  baseURL: process.env.OHRM_BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  headless: (process.env.OHRM_HEADLESS ?? 'true') === 'true',

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    //{ name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    //{ name: 'Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    //{ name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});