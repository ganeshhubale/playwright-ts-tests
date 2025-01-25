import { Page }  from "@playwright/test";

export default class RegisterPage{


    constructor(public page: Page){ }

    async goto(){
        await this.page.goto("/register");
    }
    async enterFirstName(firstname: string){
        await this.page.locator("//input[@id='firstname']").fill(firstname)
    }
    async enterLastName(lastname: string){
        await this.page.locator("//input[@id='lastname']").fill(lastname)
    }
    async enterUserName(username: string){
        await this.page.locator("//input[@id='userName']").fill(username)
    }
    async enterPassword(password: string){
        await this.page.locator("//input[@id='password']").fill(password)
    }

    async clickRegister(){
        await this.page.locator("//button[@id='register']").click()
    }
}