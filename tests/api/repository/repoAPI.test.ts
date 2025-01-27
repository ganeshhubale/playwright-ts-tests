import {expect, test} from "@playwright/test";
import { generateUserData } from "../../../utils/dataGenerator";
import { apiClient } from "../../../utils/api/apiClient";


test.describe("Repository API scenarios", () => {

    const repo = generateUserData();
    const user = process.env.GITHUB_OWNER;
    const repo_name = repo.repoName

    test("Create a new repository", async ({request}) => {

        // Make API call to create repo
        const response = await apiClient.post(request, "/user/repos", 
            {
            "name": repo_name,
            "description": repo.description,
            "homepage":"https://github.com",
            "private": false,
            "is_template": false
        });

        expect(response.status()).toBe(201);

        // Verify repo name and its description
        const apiResponseBody = await response.json();
        expect(apiResponseBody.name).toBe(repo_name);
        expect(apiResponseBody.description).toBe(repo.description);

    });

    test("Verify existing repository", async ({request}) => {

        const response = await apiClient.get(request, `/users/${user}/repos`);

        expect(response.status()).toBe(200);

        const apiResponseBody = await response.json();
        const repoNames = apiResponseBody.map((repo) => repo.name);
        expect(repoNames).toContain(repo_name);
    });

    test("Update a repository", async ({request}) => {
        const response = await apiClient.patch(request, `/repos/${user}/${repo_name}`, 
            {
                "name": `update_${repo_name}`,
                "description": "This is your first repository",
                // "homepage":"https://github.com",
                // "private":true,
                // "has_issues":true,"has_projects":true,"has_wiki":true
            },
        );

        expect(response.status()).toBe(200);

        const apiResponseBody = await response.json();

        expect(apiResponseBody.name).toBe(`update_${repo_name}`);

    });

    test.only("Delete repository", async ({request}) => {
        const repo_name = "test_repo_quo"
        const response = await apiClient.delete(request, `/repos/${user}/${repo_name}`);

        expect(response.status()).toBe(204);

    });

});