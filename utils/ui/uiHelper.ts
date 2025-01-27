import { Page } from "@playwright/test";
import config from "../config";

export const uiHelper = {
    async login(page: Page) {
        await page.goto(config.ui.baseURL);
        await page.fill("#username", config.environment.ui.username);
        await page.fill("#password", config.environment.ui.password);
        await page.click("#login-button");
    },
};
