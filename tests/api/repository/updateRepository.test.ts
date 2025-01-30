import { expect } from "@playwright/test";
import {test} from "../../../fixtures/playwright.fixtures";
import { generateUserData } from "../../../utils/dataGenerator";
import { apiClient } from "../../../utils/api/apiClient";

// Define the repository data structure
interface Repository {
  repoName: string;
  description: string;
}

// Generate repository data
const repo: Repository = generateUserData();
const updatedRepoName = `update_${repo.repoName}`;

/**
 * Wait for the repository to be ready by checking its status.
 */
async function waitForRepositoryReady(
  request: any,
  GITHUB_USERNAME: string,
  repoName: string,
  retries: number = 5,
  delay: number = 5000
): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    const response = await apiClient.get(request, `/repos/${GITHUB_USERNAME}/${repoName}`);

    if (response.status() === 200) {
      return true; // Repository is ready
    } else if (response.status() === 404) {
      console.log(`Retry ${i + 1}: Repository not found. Waiting for ${delay} ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    } else {
      throw new Error(`Failed to check repository status: ${response.status()} - ${await response.text()}`);
    }
  }
  throw new Error(`Repository not ready after ${retries} retries.`);
}

/**
 * Retry the repository update operation if it fails due to a conflict.
 */
async function retryUpdateRepository(
  request: any,
  GITHUB_USERNAME: string,
  repoName: string,
  updatedRepoName: string,
  description: string,
  retries: number = 5,
  delay: number = 5000
): Promise<any> {
  for (let i = 0; i < retries; i++) {
    const response = await apiClient.patch(request, `/repos/${GITHUB_USERNAME}/${repoName}`, {
        name: updatedRepoName,
        description: description,
        private: false,
      });

    if (response.status() === 200) {
      return response; // Success
    } else if (response.status() === 422) {
      console.log(`Retry ${i + 1}: Repository update in progress. Waiting for ${delay} ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    } else {
      throw new Error(`Failed to update repository: ${response.status()} - ${await response.text()}`);
    }
  }
  throw new Error(`Repository update failed after ${retries} retries.`);
}

test.describe("Repository API", { tag: "@api" }, () => {
  test.beforeAll("SetUp - Create repository", async ({ request, GITHUB_USERNAME }) => {
    // Create a new repository
    await apiClient.post(request, "/user/repos", {
        name: repo.repoName,
        description: repo.description,
        private: false,
        is_template: false,
      });

    // Wait for the repository to be ready
    await waitForRepositoryReady(request, GITHUB_USERNAME, repo.repoName);
  });

  test("Update a repository", async ({ request, GITHUB_USERNAME }) => {
    // Retry the update operation if it fails
    const response = await retryUpdateRepository(
      request,
      GITHUB_USERNAME,
      repo.repoName,
      updatedRepoName,
      repo.description
    );

    // Validate the response
    expect(response.status()).toBe(200);

    const apiResponseBody = await response.json();

    expect(apiResponseBody.name).toBe(updatedRepoName);
    expect(apiResponseBody.description).toBe(repo.description);
    expect(apiResponseBody.private).toBe(false);
  });

  test.afterAll("CleanUp - Delete repository", async ({ request, GITHUB_USERNAME }) => {
    // Delete the repository after the test
    await apiClient.delete(request, `/repos/${GITHUB_USERNAME}/${updatedRepoName}`);
  });
});