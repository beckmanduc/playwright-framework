import { type Page, type Locator, expect } from '@playwright/test';

export class GoogleSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('textarea[name="q"], input[name="q"]').first();
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/search/, { timeout: 15_000 });
    await this.page.locator('#center_col').waitFor({ state: 'visible', timeout: 15_000 });
  }

  async expectResultsToContain(expectedText: string): Promise<void> {
    await expect(this.page.locator('#center_col')).toContainText(expectedText, { timeout: 15_000 });
  }

  async expectResultsToBeVisible(): Promise<void> {
    await expect(this.page.locator('#center_col')).toBeVisible();
  }

  async expectMinimumResults(minCount: number): Promise<void> {
    const headings = this.page.locator('#center_col h3');
    await expect(headings.first()).toBeVisible({ timeout: 15_000 });
    const count = await headings.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }
}
