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

## Why These GitHub Workflow Permissions

In [ .github/workflows/playwright.yml ](.github/workflows/playwright.yml), this block is required for your current flow:

```yaml
permissions:
	contents: write
	pages: write
```

1. `contents: write`
- Allows the workflow to read/write repository content in branches.
- Needed for publishing to `gh-pages` and for pulling/copying previous Allure `history`.

2. `pages: write`
- Allows deployment to GitHub Pages.
- Needed because the workflow publishes Allure static site for web viewing.

How it connects to Allure history flow:

1. Workflow checks out `gh-pages` branch.
2. Copies `gh-pages/history` into `reports/allure-results/history`.
3. Generates new Allure report with trend history.
4. Publishes updated report back to `gh-pages`.

Without these permissions, deployment/history steps can fail due to insufficient rights.

## Setup Allure Report on GitHub Pages

1. Ensure workflow exists at [ .github/workflows/playwright.yml ](.github/workflows/playwright.yml) and includes:
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
