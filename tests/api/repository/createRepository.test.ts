import {expect} from "@playwright/test";
import {test} from "../../../fixtures/playwright.fixtures";
import { apiClient } from "../../../utils/api/apiClient";
import { generateUserData } from "../../../utils/dataGenerator";

const repo = generateUserData();

test.describe("Repository API", { tag: '@api' }, () => {

    test("Create a new repository", {tag: "@smoke"}, async ({request}) => {

            // Make API call to create repo
            const response = await apiClient.post(request, "/user/repos", 
                {
                "name": repo.repoName,
                "description": repo.description,
                "homepage":"https://github.com",
                "private": false,
                "is_template": false
            });

            expect(response.status()).toBe(201);

            // Verify repo name and its description
            const apiResponseBody = await response.json();
            expect(apiResponseBody.name).toBe(repo.repoName);
            expect(apiResponseBody.description).toBe(repo.description);

            // TODO: Make a get call for confirmation if repo created

    });

    test.afterAll("CleanUp - Delete repository", async ({request, GITHUB_USERNAME})=>{
            await apiClient.delete(request, `/repos/${GITHUB_USERNAME}/${repo.repoName}`);
    });

});