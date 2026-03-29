import { type Page, type Locator, expect } from '@playwright/test';

const RESULTS_CONTAINER_SELECTOR = '#center_col';
const RESULT_HEADING_SELECTOR = '#center_col h3';
const SEARCH_INPUT_SELECTOR = 'textarea[name="q"], input[name="q"]';
const DEFAULT_TIMEOUT_MS = 15_000;

export class GoogleSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly resultsContainer: Locator;
  readonly resultHeadings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator(SEARCH_INPUT_SELECTOR).first();
    this.resultsContainer = page.locator(RESULTS_CONTAINER_SELECTOR);
    this.resultHeadings = page.locator(RESULT_HEADING_SELECTOR);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/search/, { timeout: DEFAULT_TIMEOUT_MS });
    await this.resultsContainer.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT_MS });
  }

  async expectResultsToContain(expectedText: string): Promise<void> {
    await expect(this.resultsContainer).toContainText(expectedText, { timeout: DEFAULT_TIMEOUT_MS });
  }

  async expectResultsToBeVisible(): Promise<void> {
    await expect(this.resultsContainer).toBeVisible();
  }

  async expectMinimumResults(minCount: number): Promise<void> {
    await expect(this.resultHeadings.first()).toBeVisible({ timeout: DEFAULT_TIMEOUT_MS });
    const count = await this.resultHeadings.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }
}
