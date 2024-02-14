import { test } from "@playwright/test";
import { logintoWebSite } from "../utils/login";
import { closeBrowser } from "../utils/browser";
import path from "path";

let page = null;

let fields = {
  description: "description",
  entranceWidth: "entranceWidth",
  entranceHeight: "entranceHeight",
  storageSpace: "storageSpace",
  pricePerDay: "pricePerDay",
  discount: "discount",
  state: "state",
  city: "city",
  pincode: "pincode",
  locality: "locality",
  type: "type",
  facilities: "facilities",
  listingImages: "listingImages",
};

test.beforeAll(async ({ browser }) => {
  page = await logintoWebSite(browser);
});

test.afterAll(closeBrowser);

test("user can create a new listing", async () => {
  const byName = (val) => `[name=${val}]`;

  await page.getByRole("link", { name: "My Listings" }).click();
  await page.getByRole("link", { name: "Create New Listing" }).click();

  await page.locator(byName(fields.pincode)).fill("110019");
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.selectOption(byName(fields.locality), "Kalkaji");

  await page
    .locator(byName(fields.description))
    .fill("You can store household items here. The space is full of sunlight.");

  await page.locator(byName(fields.pricePerDay)).fill("850");
  await page.locator(byName(fields.discount)).fill("30");

  await page.locator(byName(fields.entranceWidth)).fill("13");
  await page.locator(byName(fields.entranceHeight)).fill("26");
  await page.locator(byName(fields.storageSpace)).fill("100");

  await page.getByLabel("Fire Protection").check();
  await page.getByLabel("Guarded Area").check();
  await page.getByLabel("Pest Control").check();
  await page.getByLabel("Security Cameras").check();
  await page.getByLabel("Residential").check();

  await page.setInputFiles(byName(fields.listingImages), [
    path.join(__dirname, "images", "1.jpeg"),
    path.join(__dirname, "images", "2.jpeg"),
    path.join(__dirname, "images", "3.jpeg"),
    path.join(__dirname, "images", "4.jpeg"),
  ]);

  await page.getByRole("button", { name: "Create New Listing" }).click();
});
