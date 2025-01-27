import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import repositoryData from "../../../../test-data/api/repositoryData.json"

import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Issues API", () => {

    test("List repository issues", async ({request, GITHUB_USERNAME}) => {

        const response = await apiClient.get(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryData.name}/issues`
        );

        expect(response.status()).toBe(200);

        const apiResponseBody = response.json();

        const issuesList = apiResponseBody.map((issue) => issue.title);

        expect(issuesList).toContain(repositoryData.issue[0]);
        expect(issuesList).toContain(repositoryData.issue[1]);
    });
});