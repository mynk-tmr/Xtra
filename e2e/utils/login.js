export async function logintoWebSite(browser) {
  let context = await browser.newContext();
  let page = await context.newPage();
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Sign In", exact: true }).click();
  await page.locator("[name=email]").fill("kiran@123.com");
  await page.locator("[name=password]").fill("kiran123");
  await page.getByRole("button", { name: "Sign In" }).click();
  return page;
}
