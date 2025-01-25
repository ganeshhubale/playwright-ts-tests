import { expect, test} from "@playwright/test"
import LoginPage from "../../pages/loginPage";

test.describe("Authentication scenarios", () => {

    test("User Login", async ({ page }) => {
        const login = new LoginPage(page);
    
        await login.goto();
        await login.enterUsername("testUserQA");
        await login.enterPassword("testUser@1");
        await login.clickLogin();
    
        // Assert redirected to profile page
        await expect(page).toHaveURL("/profile");
    
        // Assert user name and logout button visible
        const userNameValue = page.locator("//label[@id='userName-value']")
        await expect(userNameValue).toContainText("testUserQA");
        const logoutButton = page.locator("//button[@id='submit']").nth(0)
        await expect(logoutButton).toBeVisible();
    
        // Reload page and make sure user did not logout and persist session
        await page.reload()
        await expect(page).toHaveURL("/profile");
        await expect(userNameValue).toContainText("testUserQA");
    });

    test("Invalid User Login", async ({ page }) => {
        const login = new LoginPage(page);
    
        await login.goto();
        await login.enterUsername("testUserQA2");
        await login.enterPassword("testUser@1");
        await login.clickLogin();
    
    
        // Assert warning
        const errorMessage = page.locator("//p[@id='name']");
        await expect(errorMessage).toContainText("Invalid username or password!");
    });

    test("User Logout", async ({ page }) => {
        const login = new LoginPage(page);
    
        await login.goto();
        await login.enterUsername("testUserQA");
        await login.enterPassword("testUser@1");
        await login.clickLogin();
    
        // Assert redirected to profile page
        await expect(page).toHaveURL("/profile");
    
        // Assert user name and logout button visible
        await expect(page.locator("//label[@id='userName-value']")).toContainText("testUserQA");

        // Logout
        await page.locator("//button[@id='submit']").nth(0).click();
    
        // Confirm redirected to login page
        await expect(page).toHaveURL("/login");
        await expect(page.locator("h1.text-center")).toContainText("Login");
    });

});
