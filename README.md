# Playwright Framework

## Project Structure (Annotated Tree)

```text
playwright-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml              # CI pipeline: run tests, generate Allure, deploy Pages
├── config/
│   ├── api/
│   │   └── local.json                 # API base URL and API environment config
│   └── ui/
│       └── local.json                 # UI base URL and UI environment config
├── data/
│   ├── api.json                       # API test input data
│   └── search.json                    # UI test input data
├── fixtures/
│   ├── api.fixture.ts                 # API fixture setup (inject api client)
│   └── search.fixture.ts              # UI fixture setup (inject page object)
├── pages/
│   └── GoogleSearchPage.ts            # Page Object for Google search UI
├── tests/
│   ├── api/
│   │   └── public-api.spec.ts         # API test cases
│   └── search/
│       └── google-search.spec.ts      # UI test cases
├── utils/
│   ├── commonUtils.ts                 # Shared utility helpers
│   └── jsonPlaceholderClient.ts       # Reusable API client wrapper
├── playwright.config.ts               # Playwright global config and reporters
├── package.json                       # Scripts and dev dependencies
└── tsconfig.json                      # TypeScript compiler and path alias config
```

## Setup Allure Report on GitHub Pages

1. Ensure workflow exists at [ .github/workflows/playwright.yml ](.github/workflows/playwright.yml) and includes:
- permissions: `contents: write` and `pages: write`
- run tests
- generate Allure report
- deploy `reports/allure-report` to `gh-pages`

2. In GitHub repository settings, enable Pages:
- Go to Settings > Pages
- Source: Deploy from a branch
- Branch: `gh-pages`
- Folder: `/ (root)`

3. Push code to `master` or run workflow manually from Actions tab.

4. Open the published report URL:

```text
https://<your-username>.github.io/<your-repo-name>/
```

## Manual Local Check (Optional)

```bash
npm run test:api
npm run allure:generate
npm run allure:open
```
