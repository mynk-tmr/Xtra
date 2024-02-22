import { test, expect } from "@playwright/test";
import { logintoWebSite } from "../utils/login";
import path from "path";
import { fields } from "../utils/field-data";

let page = null;

test.beforeEach(async ({ browser }) => {
  page = await logintoWebSite(browser);
  await page.getByRole("link", { name: "My Listings" }).click();
});

const byName = (val) => `[name=${val}]`;
let newdescription = "This is a kitchen to store groceries.";

test("user can edit listing", async () => {
  await page.getByText("full of sunlight").nth(0).hover();
  await page.getByRole("link", { name: "Edit" }).click();
  await page.setInputFiles(byName(fields.listingImages), [
    path.join(__dirname, "images", "3.jpeg"),
  ]);
  await page.locator('[src^="http://res.cloudinary.com/"]').nth(0).hover();
  await page.getByText("Delete").nth(0).click();
  await expect(page.locator("img")).toHaveCount(2);
  await page.locator(byName(fields.description)).fill(newdescription);
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText(/listing was updated/i)).toHaveCount(1);
  await expect(page.locator(byName(fields.description))).toHaveValue(
    newdescription
  );
  await expect(page.locator('[src^="http://res.cloudinary.com/"]')).toHaveCount(
    2
  );
});

test("user can delete listing", async () => {
  await page.getByText(newdescription).hover();
  await page.getByText("Delete").nth(1).click();
  await page.getByText("Yes").click();
  await expect(page.getByText(/success/i)).toHaveCount(1);
  await expect(page.getByText(newdescription)).toHaveCount(0);
});
