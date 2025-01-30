import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import repositoryAPIData from "../../../../test-data/api/repositoryAPIData.json"
import { generateUserData } from "../../../../utils/dataGenerator";

import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Issues API", { tag: '@api' }, () => {

    let issueNumber: BigInteger;

    test.beforeAll("SetUp - Create issue", async ({request, GITHUB_USERNAME}) => {
        const issue = generateUserData();
        const issueTitle = `New bug ${issue.randomWord}`;

        const response = await apiClient.post(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryAPIData.name}/issues`,
            {
                "title": issueTitle,
                "body": "I'\''m having a problem with this.",
                "labels": ["bug"]
            }
        );

        const apiResponseBody = response.json();
        issueNumber = apiResponseBody.number;
    });

    test("Update an issue", async ({request, GITHUB_USERNAME}) => {

        const issue = generateUserData();
        const issueTitleUpdate = `new a bug ${issue.randomWord}`;

        const response = await apiClient.patch(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryAPIData.name}/issues/${issueNumber}`,
            {
                "title": issueTitleUpdate,
                "body": "I'\''m having a problem with this.",
                "labels": ["bug"]
            }
        );

        expect(response.status()).toBe(200);

        const apiResponseBody = response.json();
        expect(apiResponseBody.title).toContain(issueTitleUpdate);
    });

    test.afterAll("CleanUp - Delete an issue", async ({request, GITHUB_USERNAME}) => {

        await apiClient.delete(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryAPIData.name}/issues/${issueNumber}/lock`
        );

    });
});