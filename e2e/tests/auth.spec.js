// @ts-check
import { test, expect } from "@playwright/test";
const CLIENT_URL = "http://localhost:3000/";

test("unregistered user cannot login", async ({ page }) => {
  await page.goto(CLIENT_URL);
  await page.getByRole("link", { name: "Sign In", exact: true }).click();
  await page.locator("[name=email]").fill("anon@test.com");
  await page.locator("[name=password]").fill("anon123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator(".Toastify__toast--error");
});

test("registerd user can login", async ({ page }) => {
  await page.goto(CLIENT_URL);
  await page.getByRole("link", { name: "Sign In", exact: true }).click();
  await page.locator("[name=email]").fill("play1@test.com");
  await page.locator("[name=password]").fill("play123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator(".Toastify__toast--success");
  await page.getByRole("link", { name: "Profile", exact: true }).click();
});

test.skip("unregistered user can register new account", async ({ page }) => {
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

test.skip("logged in user can logout", async ({ page }) => {
  await page.getByRole("button", { name: "Logout" }).click();
  await page.locator(".Toastify__toast--success");
  await page.getByRole("link", { name: "Sign In", exact: true });
});
