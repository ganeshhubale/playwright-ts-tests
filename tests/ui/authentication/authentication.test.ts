import { expect } from "@playwright/test";
import { test } from "../../../fixtures/playwright.fixtures";
import LoginPage from "../../../pages/loginPage";
import config from "../../../utils/config";
import { uiHelper } from "../../../utils/ui/uiHelper";
import dashboardPage from "../../../pages/dashboardPage";

test.describe("GitHub Authentication", () => {

    test("User Login", async ({ page, uiBaseURL }) => {
        const login = new LoginPage(page, uiBaseURL);
    
        await login.goto();
        await login.enterUsername(config.ui.username);
        await login.enterPassword(config.ui.password);
        await login.clickSignIn();
    
        // Redirect to the GitHub dashboard
        await page.goto("https://github.com/dashboard");

        // Assert user name and logout button visible
        const pageTitle = page.locator("span.AppHeader-context-item-label")
        await expect(pageTitle).toContainText("Dashboard");
    
        // Reload page and make sure; user did not logout and persist session
        await page.reload()
        await expect(pageTitle).toContainText("Dashboard");
    });

    test("Invalid User Login", async ({ page, uiBaseURL }) => {
        const login = new LoginPage(page, uiBaseURL);
    
        await login.goto();
        await login.enterUsername("invalidUser");
        await login.enterPassword("invalidPassword");
        await login.clickSignIn();
    
    
        // Assert warning
        const errorMessage = page.locator("div[role='alert']");
        await expect(errorMessage).toContainText("Incorrect username or password.");
    });

    test("User Logout", async ({ page, uiBaseURL }) => {
        await uiHelper.login(page, uiBaseURL);
        
        const dashboard = new dashboardPage(page, uiBaseURL);

        await dashboard.clickProfile();

        // Click on signout
        await dashboard.clickSingout();

        // Click on singout button again
        await page.locator("input[value='Sign out']").click();

        // Confirm logout
        const title = "Build and ship software on a single, collaborative platform";
        const headlineText = page.locator("#hero-section-brand-heading");
        await expect(headlineText).toContainText(title);
    });

});
