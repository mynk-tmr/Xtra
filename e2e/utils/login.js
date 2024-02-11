export async function logintoWebSite(browser) {
  let context = await browser.newContext();
  let page = await context.newPage();
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Sign In", exact: true }).click();
  await page.locator("[name=email]").fill("play1@test.com");
  await page.locator("[name=password]").fill("play123");
  await page.getByRole("button", { name: "Sign In" }).click();
  return page;
}
