import { Page } from "@playwright/test";
import config from "../config";

export const uiHelper = {
    async login(page: Page, baseURL: string) {
        await page.goto(`${baseURL}/login`);
        await page.fill("#login_field", config.ui.username);
        await page.fill("#password", config.ui.password);
        await page.click("input[name='commit']");

        // await page.locator(`//a[@data-test-selector='recovery-code-link']`).click()
        // await page.locator("#recovery_code").fill(config.ui.passKey);
        // await page.locator("//button[contains(text(), 'Verify')]").click();
    },
};
