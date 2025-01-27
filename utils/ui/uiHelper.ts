import { Page } from "@playwright/test";
import config from "../config";

export const uiHelper = {
    async login(page: Page, baseURL: string) {
        await page.goto(`${baseURL}/login`);
        await page.fill("#login_field", config.ui.username);
        await page.fill("#password", config.ui.password);
        await page.click("input[name='commit']");
    },
};
