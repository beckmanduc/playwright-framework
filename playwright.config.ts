import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import envConfig from './config/ui/local.json';

const ROOT_DIR = __dirname;
const BASE_URL = process.env.BASE_URL ?? envConfig.baseURL;

export default defineConfig({
  testDir: path.resolve(ROOT_DIR, 'tests'),
  outputDir: path.resolve(ROOT_DIR, 'reports/test-results'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: path.resolve(ROOT_DIR, 'reports/html'), open: 'never' }],
    ['allure-playwright', { resultsDir: path.resolve(ROOT_DIR, 'reports/allure-results') }],
  ],
  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
