import { Page } from "@playwright/test";

export default class dashboardPage{

    constructor(public page: Page, public baseURL: string){}

    async goto(){
        await this.page.goto(`${this.baseURL}/dashboard`);
    };

    async clickProfile(){
        const profileAvatar = this.page.locator("//button[@aria-label='Open user navigation menu']");    
        await profileAvatar.waitFor({ state: "visible" });
        await profileAvatar.click({ force: true });    
    }

    async clickSingout(){
        await this.page.locator("//span[normalize-space(text())='Sign out']").click();
    }

    async clickMenu(menu: string){
        await this.page.locator(`//span[normalize-space(text())='${menu}']`).click();
    }

    async clickNewbutton(){
        await this.page.locator("(//a[contains(@class,'Button--primary Button--small')]//span)[1]").click();
    }

    async searchRepo(repoName: string){
        await this.page.locator("#dashboard-repos-filter-left").fill(repoName);
    }

    async clickRepoName(repoName: string){
        await this.page.locator(`(//a[@data-hovercard-url='/${repoName}/hovercard'])[2]`).click();
    }
}