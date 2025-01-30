import { PlaywrightTestConfig } from '@playwright/test';
import config from './utils/config';

const playwrightConfig: PlaywrightTestConfig = {
    testMatch: ["tests/**/*.test.ts"],
    fullyParallel: true,
    workers: 4,

    // Global settings for all projects
    use: {
        headless: true,
        screenshot: 'on-first-failure',
        video: 'off',
        launchOptions: {
        args: ['--disable-dev-shm-usage', '--no-sandbox'],
        },
        contextOptions: {
        viewport: { width: 1280, height: 720 },
        },
    },

    // Define projects for different test types (UI and API)
    projects: [
        // Project for UI tests
        {
            name: 'UI - Chromium',
            use: {
                browserName: 'chromium',
                viewport: { width: 1280, height: 720 },
                // baseURL: config.ui.baseURL, // Use baseURL from environment config
            },
            testMatch: ["tests/ui/**/*.test.ts"],
        },
        {
            name: 'UI - Firefox',
            use: {
                browserName: 'firefox',
                viewport: { width: 1280, height: 720 },
                // baseURL: config.ui.baseURL, // Use baseURL from environment config
            },
            testMatch: ["tests/ui/**/*.test.ts"],
        },
        {
            name: 'UI - WebKit',
            use: {
                browserName: 'webkit',
                viewport: { width: 1280, height: 720 },
                // baseURL: config.ui.baseURL, // Use baseURL from environment config
            },
            testMatch: ["tests/ui/**/*.test.ts"],
        },

        // Project for API tests
        {
            name: 'API',
            use: {
                // baseURL: config.api.baseURL, // Use baseURL from environment config
                // extraHTTPHeaders: config.api.headers, // Use headers from environment config
            },
            testMatch: ["tests/api/**/*.test.ts"],
        },
    ],

    retries: process.env.CI ? 2 : 0,
    reporter: [
        ['html'],
        ['list'],
        ['allure-playwright'],
    ],
};

export default playwrightConfig;