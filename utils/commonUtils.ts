export async function waitForPageReady(page: import('@playwright/test').Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}
