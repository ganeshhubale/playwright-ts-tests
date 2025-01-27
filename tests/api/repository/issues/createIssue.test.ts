import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import repositoryData from "../../../../test-data/api/repositoryData.json"
import { generateUserData } from "../../../../utils/dataGenerator";
import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Issues API", () => {

    let issueNumber: BigInteger;

    test("Create new issue", async ({request, GITHUB_USERNAME}) => {

        const issue = generateUserData();
        const issueTitle = `Found a bug ${issue.randomWord}`;

        const response = await apiClient.post(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/issues`,
            {
                "title": issueTitle,
                "body": "I'\''m having a problem with this.",
                "labels": ["bug"]
            }
        );

        expect(response.status()).toBe(201);

        const apiResponseBody = response.json();
        issueNumber = apiResponseBody.number;
        expect(apiResponseBody.title).toContain(issueTitle);
    });

    test.afterAll("CleanUp - Delete an issue", async ({request, GITHUB_USERNAME}) => {

        await apiClient.delete(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/issues/${issueNumber}/lock`
        );

    });
});