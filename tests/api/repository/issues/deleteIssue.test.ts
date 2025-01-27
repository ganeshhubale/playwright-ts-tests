import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import repositoryData from "../../../../test-data/api/repositoryData.json"
import { generateUserData } from "../../../../utils/dataGenerator";

import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Issues API", () => {

    let issueNumber: BigInteger;

    test.beforeAll("SetUp - Create issue", async ({request, GITHUB_USERNAME}) => {
        const issue = generateUserData();

        const response = await apiClient.post(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/issues`,
            {
                "title": `New bug ${issue.randomWord}`,
                "body": "I'\''m having a problem with this.",
                "labels": ["bug"]
            }
        );

        const apiResponseBody = response.json();
        issueNumber = apiResponseBody.number;

    });

    test("Delete an issue", async ({request, GITHUB_USERNAME}) => {

        const issue = generateUserData();

        const response = await apiClient.delete(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/issues/${issueNumber}/lock`
        );

        expect(response.status()).toBe(204);
    });
});