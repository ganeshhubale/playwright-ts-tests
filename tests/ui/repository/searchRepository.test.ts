import { expect } from "@playwright/test";
import { test } from "../../../fixtures/playwright.fixtures";
import dashboardPage from "../../../pages/dashboardPage";
import repositoryData from "../../../test-data/ui/repositoryData.json";
import { uiHelper } from "../../../utils/ui/uiHelper";

test.describe("Repository", { tag: "@ui" }, () => {
    test.beforeEach("SetUp - Create repository", async({page, uiBaseURL}) => {
        await uiHelper.login(page, uiBaseURL);

    });
    
    test("Search a repository", async ({ page, uiBaseURL, GITHUB_USERNAME }) => {

        const dashboard = new dashboardPage(page, uiBaseURL);
        await dashboard.searchRepo(repositoryData.name);

        const repoLocator = page.locator(`(//a[@data-hovercard-url='/${GITHUB_USERNAME}/${repositoryData.name}/hovercard'])[2]`); 
        await expect(repoLocator).toBeVisible();
    });
});