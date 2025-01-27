import {expect} from "@playwright/test";
import {test} from "../../../fixtures/playwright.fixtures";
import { apiClient } from "../../../utils/api/apiClient";
import repositoryData from "../../../test-data/api/repositoryData.json";

test("Verify existing repository exists", async ({request, GITHUB_USERNAME}) => {

        const response = await apiClient.get(request, `/users/${GITHUB_USERNAME}/repos`);
        expect(response.status()).toBe(200);

        const apiResponseBody = await response.json();
        const repoNames = apiResponseBody.map((repo) => repo.name);
        expect(repoNames).toContain(repositoryData.name);
});