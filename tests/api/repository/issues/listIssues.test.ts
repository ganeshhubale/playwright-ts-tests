import {expect} from "@playwright/test";
import {test} from "../../../../fixtures/playwright.fixtures";
import repositoryAPIData from "../../../../test-data/api/repositoryAPIData.json"

import { apiClient } from "../../../../utils/api/apiClient";

test.describe("Issues API", { tag: '@api' }, () => {

    test("List repository issues", async ({request, GITHUB_USERNAME}) => {

        const response = await apiClient.get(request, 
            `/repos/${GITHUB_USERNAME}/${repositoryAPIData.name}/issues`
        );

        expect(response.status()).toBe(200);

        const apiResponseBody = response.json();

        const issuesList = apiResponseBody.map((issue) => issue.title);

        expect(issuesList).toContain(repositoryAPIData.issue[0]);
        expect(issuesList).toContain(repositoryAPIData.issue[1]);
    });
});