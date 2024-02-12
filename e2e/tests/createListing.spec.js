import { test } from "@playwright/test";
import { logintoWebSite } from "../utils/login";
import { closeBrowser } from "../utils/browser";
import path from "path";

let page = null;

test.beforeAll(async ({ browser }) => {
  page = await logintoWebSite(browser);
});

test.afterAll(closeBrowser);

test("user can create a new listing", async () => {
  await page.getByRole("link", { name: "My Listings" }).click();

  await page.locator("[name=pincode]").fill("110019");
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.selectOption("[name=locality]", "Kalkaji");

  await page
    .locator("[name=description]")
    .fill("You can store household items here. The space is full of sunlight.");

  await page.locator("[name=pricePerDay]").fill("850");
  await page.locator("[name=discount]").fill("30");

  await page.locator("[name=entraceDimensions_width]").fill("13");
  await page.locator("[name=entraceDimensions_height]").fill("26");
  await page.locator("[name=storageSpace]").fill("100");

  await page.getByLabel("Fire Protection").check();
  await page.getByLabel("Guarded Area").check();
  await page.getByLabel("Pest Control").check();
  await page.getByLabel("Security Cameras").check();
  await page.getByLabel("Residential").check();

  await page.setInputFiles("[name=listingImages]", [
    path.join(__dirname, "images", "1.jpeg"),
    path.join(__dirname, "images", "2.jpeg"),
    path.join(__dirname, "images", "3.jpeg"),
    path.join(__dirname, "images", "4.jpeg"),
  ]);

  await page.getByRole("button", { name: "Create New Listing" }).click();
  await page.locator(".Toastify__toast--success");
});

test("discount price check is working", async () => {
  await page.locator("[name=pricePerDay]").fill("8");
  await page.locator("[name=discount]").fill("10");
  await page.getByRole("button", { name: "Create New Listing" }).click();
  await page.locator(".Toastify__toast--error");
  await page.locator("[name=discount]").fill("-4");
  await page.getByRole("button", { name: "Create New Listing" }).click();
  await page.locator(".Toastify__toast--error");
  await page.locator("[name=discount]").fill("4");
  await page.getByRole("button", { name: "Create New Listing" }).click();
  await page.locator(".Toastify__toast--success");
});
