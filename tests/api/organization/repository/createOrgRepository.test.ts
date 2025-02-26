import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import { apiClient } from "../../../../utils/api/apiClient";
import { generateUserData } from "../../../../utils/dataGenerator";
import orgAPIData from "../../../../test-data/api/orgAPIData.json";

const repo = generateUserData();

test.describe("Organization repository API", { tag: '@api' }, () => {

    test("Create a new organization repository", {tag: "@smoke"}, async ({request}) => {

            const response = await apiClient.post(request, `/orgs/${orgAPIData.name}/repos`, 
                {
                "name": repo.repoName,
                "description": repo.description
            });

            expect(response.status()).toBe(201);

            // Verify repo name and its description
            const apiResponseBody = await response.json();
            expect(apiResponseBody.name).toBe(repo.repoName);
            expect(apiResponseBody.description).toBe(repo.description);

    });

    test.afterAll("CleanUp - Delete repository", async ({request, GITHUB_USERNAME})=>{
            await apiClient.delete(request, `/repos/${GITHUB_USERNAME}/${repo.repoName}`);
    });

});