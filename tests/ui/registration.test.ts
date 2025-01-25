import { expect, test } from "@playwright/test";
import RegisterPage from "../../pages/registrationPage";
import { generateUserData } from "../../utils/dataGenerator";

// Test for user registration
test("New User Registration", async ({ page, request }) => {

    const userData = generateUserData()

    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const password = userData.password;
    const userName = userData.userName;

    // Mock reCAPTCHA API
    await page.route('https://www.google.com/recaptcha/api2/**', (route) => {
        route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"success": true}',
        });
    });

    // Navigate to registration page and fill details
    const register = new RegisterPage(page);

    await register.goto();
    await register.enterFirstName(firstName);
    await register.enterLastName(lastName);
    await register.enterUserName(userName);
    await register.enterPassword(password);

    // Handle reCAPTCHA
    // const frame = page.frameLocator('iframe[title="reCAPTCHA"]');
    // await frame.locator("#recaptcha-anchor").click();

    // Handle success dialog
    page.on("dialog", async (dialog) => {
        expect(dialog.message()).toEqual("User Register Successfully.");
        await dialog.accept();
    });

    // Submit registration form
    await register.clickRegister();

    // Verify user authorization via API
    const apiResponse = await request.post("/Account/v1/Authorized", {
        data: { userName, password },
    });
    // const responseBody = await apiResponse.json();
    // console.log(responseBody);
    expect(apiResponse.ok()).toBeTruthy();
    
    // expect(responseBody).toMatchObject({ userName });
});