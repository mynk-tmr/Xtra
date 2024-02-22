import { test, describe, expect } from "@playwright/test";
import { logintoWebSite } from "../utils/login";
import path from "path";
import { fields } from "../utils/field-data";

let page = null;

test.beforeAll(async ({ browser }) => {
  page = await logintoWebSite(browser);
  await page.getByRole("link", { name: "My Listings" }).click();
  await page.getByRole("link", { name: "Create New" }).click();
});

const byName = (val) => `[name=${val}]`;

describe("Pincode Functionality", async () => {
  test("City, state, locality aren't initially visible", async () => {
    await expect(page.locator(byName(fields.city))).toHaveCount(0);
    await expect(page.locator(byName(fields.state))).toHaveCount(0);
    await expect(page.locator(byName(fields.locality))).toHaveCount(0);
  });

  test("City, state, locality are visible once pincode is verified", async () => {
    await page.locator(byName(fields.pincode)).fill("110019");
    await page.getByRole("button", { name: "pincode" }).click();
    await expect(page.locator(byName(fields.city))).toHaveCount(1);
    await expect(page.locator(byName(fields.state))).toHaveCount(1);
    await expect(page.locator(byName(fields.locality))).toHaveCount(1);
  });
});

test("user can create a new listing", async () => {
  await page.selectOption(byName(fields.locality), "Kalkaji");

  await page
    .locator(byName(fields.description))
    .fill("You can store household items here. The space is full of sunlight.");

  await page.locator(byName(fields.pricePerDay)).fill("850");
  await page.locator(byName(fields.discount)).fill("30");

  await page.locator(byName(fields.entranceWidth)).fill("13");
  await page.locator(byName(fields.entranceHeight)).fill("26");
  await page.locator(byName(fields.storageSpace)).fill("100");

  await page.getByLabel("Guarded Area").check();
  await page.getByLabel("Pest Control").check();
  await page.getByLabel("Security Cameras").check();
  await page.getByLabel("Residential").check();

  await page.setInputFiles(byName(fields.listingImages), [
    path.join(__dirname, "images", "1.jpeg"),
    path.join(__dirname, "images", "2.jpeg"),
  ]);
  await expect(page.locator("img")).toHaveCount(2);
  await page.getByRole("button", { name: "Create New Listing" }).click();
  await expect(page.getByText(/listing is added/i)).toHaveCount(1);
});
