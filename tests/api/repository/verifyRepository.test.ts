import {expect} from "@playwright/test";
import {test} from "../../../fixtures/playwright.fixtures";
import { apiClient } from "../../../utils/api/apiClient";
import repositoryAPIData from "../../../test-data/api/repositoryAPIData";

// Define the structure of the repository data
interface Repository {
        name: string;
        description: string;
        private: boolean;
}

test("Verify existing repository", { tag: '@apid' }, async ({request, GITHUB_USERNAME}) => {

        try {
                // Fetch the list of repositories for the user
                const response = await apiClient.get(request, `/users/${GITHUB_USERNAME}/repos`);
                expect(response.status()).toBe(200);

                // Parse the response body
                const apiResponseBody: Repository[] = await response.json();

                // Extract repository names
                const repoNames: string[] = apiResponseBody.map((repo: Repository) => repo.name);

                // Verify that the repository exists
                expect(repoNames).toContain(repositoryAPIData.name);
                console.log(`Repository "${repositoryAPIData.name}" exists.`);
                
        } catch (error) {
                console.error("Error verifying repository:", error);
                throw error; // Re-throw the error to fail the test
        }
});