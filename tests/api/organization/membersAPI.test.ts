import {expect, test} from "@playwright/test";
import { generateUserData } from "../../../utils/dataGenerator";

test.describe("Members API scenarios", () => {

    test("Create an orgnization invitation", async ({request}) => {

    });

    test("List organization members", async ({request}) => {

        const userData = generateUserData();

        const userName = userData.userName
        const password = userData.password

        console.log(userName, password)
        const response = await request.post("/Account/v1/User", {
        data:{
                "userName": userName,
                "password": password
            }
        });

        expect(response.status()).toBe(201); 

        const apiResponseBody = await response.json();
        console.log(apiResponseBody)
        expect(apiResponseBody.username).toBe(userName)

        // Check if user is authorized
        const apiResponse = await request.post("/Account/v1/Authorized", {
            data:{
                "userName": userName,
                "password": password
            }
        });
        expect(apiResponse.status()).toBe(200);

    });

    test("Remove organization member", async ({request}) => {

    });

    test("Update a repository", async ({request}) => {

    });

});