import { chromium, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testMatch:["tests/api/repository/repoAPI.test.ts"],
    fullyParallel: true,
    workers: 4,
    use: {
        baseURL: "https://api.github.com",
        headless: false,
        screenshot: 'on-first-failure',
        video: 'off',
        launchOptions: {
            args: ['--disable-dev-shm-usage', '--no-sandbox'], // Speeds up Chromium startup
        },
        contextOptions: {
            viewport: { width: 1280, height: 720 },
        },
    },

    projects: [
        {
            name: 'Chromium', // Project name for Chromium browser
            use: {
            browserName: 'chromium',
            viewport: { width: 1280, height: 720 },
            }
    }],
    retries: 0,
    
    reporter:[['html']]

};

export default config;
