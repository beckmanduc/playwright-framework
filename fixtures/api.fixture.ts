import { test as base } from '@playwright/test';
import { JsonPlaceholderClient } from '@utils/jsonPlaceholderClient';

type ApiFixtures = {
  apiClient: JsonPlaceholderClient;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new JsonPlaceholderClient(request);
    await use(apiClient);
  },
});

export { expect } from '@playwright/test';
