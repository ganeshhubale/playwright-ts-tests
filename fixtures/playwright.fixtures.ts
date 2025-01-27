import { test as baseTest } from "@playwright/test";
import config from "../utils/config";

export const test = baseTest.extend<{
    GITHUB_USERNAME: String;
}>({
    GITHUB_USERNAME: async ({}, use) => {
        await use(config.api.username)
    },
});