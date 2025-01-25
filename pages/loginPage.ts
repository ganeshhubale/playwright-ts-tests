import { Page } from "@playwright/test";

export default class LoginPage{

    constructor(public page: Page){}

    async goto(){
        await this.page.goto("/login", {timeout: 15000})
    }

    async enterUsername(username: string){
        await this.page.locator("//input[@id='userName']").fill(username)
        // await this.page.locator("#userName").fill(username)  // Test were failing 
        // Use more efficient selectors like data-testid or id attributes, 
        // as CSS or XPath selectors can sometimes slow down execution:


    }

    async enterPassword(password: string){
        await this.page.locator("//input[@id='password']").fill(password)
    }

    async clickLogin(){
        await this.page.locator("//button[@id='login']").click()
    }
}