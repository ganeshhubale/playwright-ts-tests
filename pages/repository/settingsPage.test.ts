import { Page } from "@playwright/test";

export default class settingsPage{

    constructor(public page: Page){}

    async deleteRepo(repoName: string){
        await this.page.locator("//span[normalize-space(text())='Delete this repository']").click();
        await this.page.locator("//span[normalize-space(text())='I want to delete this repository']").click();
        await this.page.locator("//span[normalize-space(text())='I have read and understand these effects']").click();
        await this.page.locator("input[name='verification_field']").fill(repoName);
        await this.page.locator("button#repo-delete-proceed-button>span>span").click()
    }
}