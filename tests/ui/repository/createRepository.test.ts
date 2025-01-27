import { expect } from "@playwright/test";
import { test } from "../../../fixtures/playwright.fixtures";
import {uiHelper} from "../../../utils/ui/uiHelper";
import dashboardPage from "../../../pages/dashboardPage";
import repositoriesPage from "../../../pages/repositoriesPage";
import {generateRepoData} from "../../../utils/dataGenerator";
import { apiClient } from "../../../utils/api/apiClient";

test.describe("Repository", () => {

    const repo = generateRepoData();
    let repoName = repo.name;

    test.beforeEach("SetUp - Login", async({page, uiBaseURL}) => {

        await uiHelper.login(page, uiBaseURL);

    });

    test("Create a new repository", async ({ page, uiBaseURL, request, GITHUB_USERNAME }) => {
        const dashboard = new dashboardPage(page, uiBaseURL);
        // await dashboard.clickProfile();
        // Click on new repositories
        // await dashboard.clickMenu("Your repositories");
        await dashboard.clickNewbutton();

        // Click on new button
        const repositories = new repositoriesPage(page);
        // await repositories.clickNewButton();
        await repositories.fillDetails(repoName, repo.description);
        await repositories.clickCreateRepositoryButton();

        // Verify the repository exists using the API
        const response = await apiClient.get(request, `/users/${GITHUB_USERNAME}/repos`);
        expect(response.status()).toBe(200);

        const apiResponseBody = await response.json();
        const repoNames = apiResponseBody.map((repo) => repo.name);
        expect(repoNames).toContain(repoName);
    });

    test.afterAll("CleanUp - Delete repository", async ({request, GITHUB_USERNAME}) => {
        const response = await apiClient.delete(request, `/repos/${GITHUB_USERNAME}/${repoName}`);
        expect(response.status()).toBe(204);
    });
});