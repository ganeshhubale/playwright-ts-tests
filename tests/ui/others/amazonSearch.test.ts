import { expect } from "@playwright/test";
import { test } from "../../../fixtures/playwright.fixtures";

test('Amazon search', { tag: '@others' }, async ({page}) => { 

    await page.goto("https://amazon.in");
    await page.locator("//input[@role='searchbox']").fill("iPhone");
    await page.locator("input[type='submit']").click();
    await page.waitForSelector('.s-result-item');
    await page.waitForSelector("//div[@data-cy='title-recipe']");
    await page.waitForLoadState("domcontentloaded");

    // Fetch iPhones without tag sponsored
    const rows = page.locator(`//div[@data-cy='title-recipe']`);
    const texts = await rows.evaluateAll(
        list => list.filter(element => !element.querySelector(".puis-label-popover-default"))
        .map(element => element.textContent)
    );
    console.log("Unsponsored iPhones:- ");
    console.table(texts);

    // Fetch iPhones with tag sponsored
    const rowsSponsor = page.locator(`//div[@data-cy='title-recipe']`);
    const names = await rowsSponsor.evaluateAll(
        list => list.filter(element => element.querySelector(".puis-label-popover-default"))
        .map(element => element.textContent) 
    )
    console.log("Sponsored iPhones:- ");
    console.log(names)
})
