// @ts-check
import { test } from "@playwright/test";

let page = null;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("http://localhost:3000/");
});

test.afterAll(async ({ browser }) => {
  browser.close();
});

test("unregistered user cannot login", async () => {
  await page.getByRole("link", { name: "Sign In", exact: true }).click();
  await page.locator("[name=email]").fill("anon@test.com");
  await page.locator("[name=password]").fill("anon123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator(".Toastify__toast--error");
});

test("registerd user can login", async () => {
  await page.locator("[name=email]").fill("play1@test.com");
  await page.locator("[name=password]").fill("play123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator(".Toastify__toast--success");
  await page.getByRole("link", { name: "Profile", exact: true }).click();
});

test("logged in user can logout", async () => {
  await page.getByRole("button", { name: "Logout" }).click();
  await page.locator(".Toastify__toast--success");
  await page.getByRole("link", { name: "Sign In", exact: true }).click();
});

test("unregistered user can register new account", async () => {
  await page.getByRole("link", { name: "Register" }).click();
  await page.locator("[name=firstName]").fill("Random");
  await page.locator("[name=lastName]").fill("Number");
  await page.locator("[name=email]").fill(`random@${Math.random() * 1e7}.com`);
  await page.locator("[name=password]").fill("rand123");
  await page.locator("[name=confirm_password]").fill("rand123");
  await page.getByRole("button", { name: "Create Account" }).click();
  await page.locator(".Toastify__toast--success");
  await page.getByRole("link", { name: "Profile", exact: true }).click();
});