import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import repositoryData from "../../../../test-data/api/repositoryData.json"
import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Branches API", () => {

    test("List branches", async ({request, GITHUB_USERNAME}) => {

        const response = await apiClient.get(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/branches`
        );

        expect(response.status()).toBe(200);

        const apiResponseBody = await response.json();
        const branchNames = apiResponseBody.map((branch) => branch.name);
        expect(branchNames).toContain(repositoryData.branch);
    });
});