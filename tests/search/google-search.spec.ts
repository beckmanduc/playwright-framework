import { test, expect } from '../../fixtures/search.fixture';
import searchData from '../../data/search.json';

test.describe('Google Search - Search by Name', () => {
  for (const { query, expectedText } of searchData.names) {
    test(`should return results when searching for "${query}"`, async ({ googleSearchPage }) => {
      await googleSearchPage.searchFor(query);
      await googleSearchPage.expectResultsToContain(expectedText);
      await googleSearchPage.expectMinimumResults(3);
    });
  }

  test('should display search results page with correct title', async ({ googleSearchPage, page }) => {
    const searchTerm = 'Playwright';
    await googleSearchPage.searchFor(searchTerm);
    await expect(page).toHaveTitle(new RegExp(searchTerm));
  });
});
