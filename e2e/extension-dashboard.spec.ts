import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

let context: BrowserContext;
let extensionId: string;

test.beforeAll(async () => {
  const pathToExtension = path.resolve(process.cwd(), 'apps/extension/.output/chrome-mv3');

  context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      '--no-sandbox',
    ],
  });

  let worker = context.serviceWorkers()[0];
  if (!worker) {
    worker = await context.waitForEvent('serviceworker', { timeout: 10000 });
  }

  extensionId = worker.url().split('/')[2];
});

test.afterAll(async () => {
  await context?.close();
});

test.describe('New Tab Dashboard E2E Tests', () => {
  test('loads dashboard on new tab page override with Tailwind CSS styles applied', async () => {
    expect(extensionId).toBeDefined();
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/newtab.html`);

    // Verify Title
    await expect(page).toHaveTitle('Web Wellbeing Dashboard');

    // Verify Header Brand
    const brandElement = page.getByText('Web Wellbeing', { exact: true });
    await expect(brandElement).toBeVisible();

    // Verify CSS styling is applied (not raw unstyled HTML)
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Check background color computed style is styled
    const sidebarBg = await sidebar.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(sidebarBg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('navigates between dashboard views using sidebar links', async () => {
    expect(extensionId).toBeDefined();
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/newtab.html`);

    // Click Analytics
    await page.getByRole('link', { name: 'Analytics' }).click();
    await expect(page.locator('h1')).toContainText('Analytics & Usage Insights');
    expect(page.url()).toContain('#/analytics');

    // Click Focus Mode
    await page.getByRole('link', { name: 'Focus Mode' }).click();
    await expect(page.locator('h1')).toContainText('Focus Mode & Pomodoro Timer');
    expect(page.url()).toContain('#/focus');

    // Click Goals
    await page.getByRole('link', { name: 'Goals' }).click();
    await expect(page.locator('h1')).toContainText('Productivity Goals & Targets');
    expect(page.url()).toContain('#/goals');

    // Click Settings
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page.locator('h1')).toContainText('Settings & Preferences');
    expect(page.url()).toContain('#/settings');

    // Click Overview back
    await page.getByRole('link', { name: 'Overview' }).click();
    await expect(page.locator('h1')).toContainText('Good day');
  });

  test('toggles theme between dark and light mode', async () => {
    expect(extensionId).toBeDefined();
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/newtab.html`);

    const themeToggleBtn = page.getByTitle('Toggle Theme');
    await expect(themeToggleBtn).toBeVisible();

    // Default theme is dark
    const rootContainer = page.locator('div.min-h-screen');
    await expect(rootContainer).toHaveClass(/dark/);

    // Toggle theme
    await themeToggleBtn.click();
    await expect(rootContainer).not.toHaveClass(/dark/);
  });
});
