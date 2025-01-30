import { Page } from "@playwright/test";

export default class LoginPage{

    constructor(public page: Page, public baseURL: string){}

    async goto(){
        await this.page.goto(`${this.baseURL}/login`, {timeout: 15000})
    }

    async enterUsername(username: string){
        await this.page.locator("#login_field").fill(username)
    }

    async enterPassword(password: string){
        await this.page.locator("#password").fill(password)
    }
    
    async clickSignIn(){
        await this.page.locator("input[name='commit']").click()
    }

    async clickPasskey(){
        await this.page.locator(`//a[@data-test-selector='recovery-code-link']`).click()
    }

    async enterCode(passkey: string){
        await this.page.locator("#recovery_code").fill(passkey);
    }

    async clickVerify(){
        await this.page.locator("//button[contains(text(), 'Verify')]").click();
    }

}