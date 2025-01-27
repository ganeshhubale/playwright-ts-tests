import { test as baseTest } from "@playwright/test";
import config from "../utils/config";

export const test = baseTest.extend<{
    GITHUB_USERNAME: string;
    uiBaseURL: string;
}>({
    GITHUB_USERNAME: async ({}, use) => {
        await use(config.api.username)
    },
    uiBaseURL: async ({}, use) => {
        await use(config.ui.baseURL)
    },
});

// ToDo: login fixture