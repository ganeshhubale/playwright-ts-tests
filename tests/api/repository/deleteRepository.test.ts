import {expect, test} from "@playwright/test";
import { generateUserData } from "../../../utils/dataGenerator";
import { apiClient } from "../../../utils/api/apiClient";
import config from "../../../utils/config";

const username =  config.api.username;
const repo = generateUserData();

test.describe("Repository API", ()=> {

    test.beforeAll("SetUp - Create repository", async ({request}) => {
    
            await apiClient.post(request, "/user/repos", 
                        {
                        "name": repo.repoName,
                        "description": repo.description,
                        "homepage":"https://github.com",
                        "private": false,
                        "is_template": false
            });
    
    });

    test("Delete a repository", async ({request}) => {
            const response = await apiClient.delete(request, `/repos/${username}/${repo.repoName}`);
            expect(response.status()).toBe(204);
    });

});
