import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import { generateUserData } from "../../../../utils/dataGenerator";
import repositoryData from "../../../../test-data/api/repositoryData.json"
import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Branches API", () => {

    let nonMainBranches: string[] = [];

    test.beforeAll("SetUp - Get a branch to rename", async ({request, GITHUB_USERNAME}) => {

        const response = await apiClient.get(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/branches`);

        const apiResponseBody = await response.json();
        const branchNames = apiResponseBody.map((branch) => branch.name);

        nonMainBranches = branchNames.filter((branchName) => branchName !== "main");

    });

    test("Rename branch", async ({request, GITHUB_USERNAME}) => {
        const newName = generateUserData();
        const response = await apiClient.post(request, 
            `/repos/${GITHUB_USERNAME}/{repositoryData.name}/branches/${nonMainBranches[0]}/rename`, 
            {"new_name": newName.branchName}
        );

        expect(response.status()).toBe(201);

        const apiResponseBody = await response.json();
        expect(apiResponseBody.name).toBe(newName.branchName);
    });
});