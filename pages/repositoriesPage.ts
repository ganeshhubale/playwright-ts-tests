import { Page }  from "@playwright/test";

export default class repositoriesPage{

    constructor(public page: Page){ }

    async clickNewButton(){
        await this.page.locator("a.text-center.btn").click();
    }

    async fillDetails(name: string, description: string){
        await this.page.locator("input[aria-describedby='RepoNameInput-is-available RepoNameInput-message']").fill(name);
        await this.page.locator("input[name='Description']").fill(description);
    }

    async clickCreateRepositoryButton(){
        // Scroll into view if needed
        const createRepo = this.page.locator("//span[normalize-space(text())='Create repository']");
        await createRepo.click({force: true});
    }

    async clickTab(tabName: string){
        const tab = this.page.locator(`//span[@data-content='${tabName}']`);
        await tab.click({force: true});
    }
}

