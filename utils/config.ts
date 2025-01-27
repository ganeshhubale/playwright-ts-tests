import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();


const config = {
    staging: {
        ui: {
            baseURL: process.env.UI_BASE_URL_STAGE || "",
            username: process.env.UI_USERNAME_STAGE || "",
            password: process.env.UI_PASSWORD_STAGE || "",
        },
        api: {
            baseURL: process.env.API_BASE_URL_STAGE || "",
            token: process.env.API_TOKEN_STAGE || "",
            headers: {
                Authorization: `token ${process.env.API_TOKEN_STAGE}`,
                Accept: "application/vnd.github+json",
            },
        },
    },
    production: {
        ui: {
            baseURL: process.env.UI_BASE_URL || "",
            username: process.env.UI_USERNAME || "",
            password: process.env.UI_PASSWORD || "",
        },
        api: {
            baseURL: process.env.API_BASE_URL || "",
            token: process.env.API_TOKEN || "",
            username: process.env.GITHUB_USERNAME || "",
            headers: {
                Authorization: `token ${process.env.API_TOKEN}`,
                Accept: "application/vnd.github+json",
            },
        },
    },
};

const environment = process.env.ENV || "production";

// Validate the environment key
if (!config[environment]) {
    throw new Error(
        `Invalid environment: ${environment}. Expected "staging" or "production".`
    );
}

export default config[environment];
