import { expect } from "@playwright/test";
import { test } from "../../../fixtures/playwright.fixtures";
import {uiHelper} from "../../../utils/ui/uiHelper";
import dashboardPage from "../../../pages/dashboardPage";
import {generateRepoData} from "../../../utils/dataGenerator";
import { apiClient } from "../../../utils/api/apiClient";
import settingsPage from "../../../pages/repository/settingsPage.test";
import repositoriesPage from "../../../pages/repositoriesPage";

test.describe("Repository", () => {

    const repo = generateRepoData();

    test.beforeEach("SetUp - Create repository", async({page, request, uiBaseURL}) => {
        await apiClient.post(request, "/user/repos", 
                            {
                            "name": repo.name,
                            "description": repo.description,
                            "homepage":"https://github.com",
                            "private": false,
                            "is_template": false
                }
            );
        
        await uiHelper.login(page, uiBaseURL);

    });

    test("Delete repository", async ({ page, uiBaseURL, request, GITHUB_USERNAME }) => {
        const dashboard = new dashboardPage(page, uiBaseURL);
        await dashboard.searchRepo(repo.name);
        await dashboard.clickRepoName(`${GITHUB_USERNAME}/${repo.name}`);

        // Click settings tab
        const repository = new repositoriesPage(page);
        await repository.clickTab("Settings");

        // Delete repo
        const settings = new settingsPage(page);
        await settings.deleteRepo(`${GITHUB_USERNAME}/${repo.name}`);

        // Assert message
        const alert = page.locator("//div[@role='alert']");
        expect(alert).toContainText(`Your repository "${GITHUB_USERNAME}/${repo.name}" was successfully deleted.`)

        // Verify repository deleted using the API
        const response = await apiClient.get(request, `/users/${GITHUB_USERNAME}/repos`);
        expect(response.status()).toBe(200);

        const apiResponseBody = await response.json();
        const repoNames = apiResponseBody.map((repo) => repo.name);
        expect(repoNames).not.toContain(repo.name);
    });
});