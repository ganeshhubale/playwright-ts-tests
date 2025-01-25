import { Page } from "@playwright/test";

export default class bookstorePage{

    constructor(public page: Page){}

    async goto(){
        await this.page.goto("/books");
    };

    async searchBook(bookName: string){
        await this.page.locator("//input[@id='searchBox']").fill(bookName, {force: true})
    }
}