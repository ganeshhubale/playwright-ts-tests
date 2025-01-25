import { Page }  from "@playwright/test";

export default class RegisterPage{


    constructor(public page: Page){ }

    async goto(){
        await this.page.goto("/register");
    }
    async enterFirstName(firstname: string){
        await this.page.locator("//input[@id='firstname']").fill(firstname, {force: true})
    }
    async enterLastName(lastname: string){
        await this.page.locator("//input[@id='lastname']").fill(lastname, {force: true})
    }
    async enterUserName(username: string){
        await this.page.locator("//input[@id='userName']").fill(username, {force: true})
    }
    async enterPassword(password: string){
        await this.page.locator("//input[@id='password']").fill(password, {force: true})
    }

    async clickRegister(){
        await this.page.locator("//button[@id='register']").click({force: true})
    }
}