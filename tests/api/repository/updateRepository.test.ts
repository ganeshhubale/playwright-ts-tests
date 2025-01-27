import {expect} from "@playwright/test";
import {test} from "../../../fixtures/playwright.fixtures";
import { generateUserData } from "../../../utils/dataGenerator";
import { apiClient } from "../../../utils/api/apiClient";

const repo = generateUserData();
const updatedRepoName = `update_${repo.repoName}`;

test.describe("Repository API", () => {

    test.beforeAll("SetUp - Create repository", async ({request}) => {

        await apiClient.post(request, "/user/repos", 
                    {
                    "name": repo.repoName,
                    "description": repo.description,
                    "homepage":"https://github.com",
                    "private": false,
                    "is_template": false
        });

    });

    test("Update a repository", async ({request, GITHUB_USERNAME}) => {

            const response = await apiClient.patch(request, `/repos/${GITHUB_USERNAME}/${repo.repoName}`, 
                {
                    "name": updatedRepoName,
                    "description": repo.description,
                    "homepage":"https://github.com",
                    "private":false
                },
            );

            expect(response.status()).toBe(200);

            const apiResponseBody = await response.json();

            expect(apiResponseBody.name).toBe(updatedRepoName);

    });

    test.afterAll("CleanUp - Delete repository", async ({request, GITHUB_USERNAME})=>{
        await apiClient.delete(request, `/repos/${GITHUB_USERNAME}/${updatedRepoName}`);
    });
});
