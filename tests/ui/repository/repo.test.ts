import { expect, test } from "@playwright/test";
import bookstorePage from "../../../pages/bookstorePage";
import booksdata from "../../../test-data/books.json";

test.describe("Repository scenarios", () => {

    test("Create a new repository", async ({ page }) => {

        const bookstore = new bookstorePage(page);

        await bookstore.goto();
        await bookstore.searchBook(booksdata.books.title);

        // Assert list of books
        const rows =  page.locator(".rt-table .rt-tbody .rt-tr-group");
        const rowCount = await rows.count();

        for (let i=0; i < rowCount; i++){
            const title = (await rows.nth(i).locator(".rt-td").nth(1).textContent())?.trim();
            const author = (await rows.nth(i).locator(".rt-td").nth(2).textContent())?.trim();
            const publisher = (await rows.nth(i).locator(".rt-td").nth(3).textContent())?.trim();

            if (!title && !author && !publisher){
                continue; // Skip the blank rows
            }

            expect(title).toBe(booksdata.books.title);
            expect(author).toBe(booksdata.books.author);
            expect(publisher).toBe(booksdata.books.publisher);
        }
    });

    test("Delete a repository", async ({ page }) => {
    });

    test("Update a repository", async ({ page }) => {
    });
});