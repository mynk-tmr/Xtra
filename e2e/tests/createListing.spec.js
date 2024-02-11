import { test } from "@playwright/test";
import { logintoWebSite } from "../utils/login";
import { closeBrowser } from "../utils/browser";

let page = null;

test.beforeAll(async ({ browser }) => {
  page = await logintoWebSite(browser);
});

test.afterAll(closeBrowser);

test("user can create a new listing", async () => {
  await page.getByRole("link", { name: "My Listings" }).click();

  await page.locator("[name=state]").fill("Uttar Pradesh");
  await page.locator("[name=city]").fill("Noida");
  await page.locator("[name=locality]").fill("Godrej Nest");
  await page.locator("[name=pincode]").fill("300411");
  await page.selectOption("[name=type]", "Residential");

  await page
    .locator("[name=description]")
    .fill("You can store household items here. The space is full of sunlight.");

  await page.locator("[name=pricePerDay]").fill("850");
  await page.locator("[name=discount]").fill("30");

  await page.locator("[name=entraceDimensions_width]").fill("13");
  await page.locator("[name=entraceDimensions_height]").fill("26");
  await page.locator("[name=storageSpace]").fill("100");

  await page.getByLabel("Fire Protection").check();
  await page.getByLabel("Guarded").check();
  await page.getByLabel("Pest Control").check();
  await page.getByLabel("Security Camera").check();

  await page.setInputFiles("[name=imageFiles]", [
    "../images/1.jpeg",
    "../images/2.jpeg",
    "../images/3.jpeg",
    "../images/4.jpeg",
  ]);

  await page.getByRole("button", { name: "Create New Listing" }).click();
  await page.locator(".Toastify__toast--success");
});
