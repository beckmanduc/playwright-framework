import { test as base, type Page } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

type SearchFixtures = {
  googleSearchPage: GoogleSearchPage;
};

export const test = base.extend<SearchFixtures>({
  googleSearchPage: async ({ page }, use) => {
    const googleSearchPage = new GoogleSearchPage(page);
    await googleSearchPage.navigate();
    await use(googleSearchPage);
  },
});

export { expect } from '@playwright/test';
