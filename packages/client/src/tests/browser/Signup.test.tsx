// import { Browser, chromium, expect, Page } from 'playwright/test'; //BrowserContext, 
// import { afterAll, beforeAll, describe, test } from 'vitest';

import { expect, chromium, test, Browser } from 'playwright/test';

test('playwright', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  // await page.screenshot({ path: 'screenshot.png' });
  await expect(page).toHaveTitle('PersonaVerse');
});

// describe('playwright meets vitest', () => {
//   let page: Page;
//   let browser: Browser;
//   // let context: BrowserContext;
  
//   beforeAll(async () => {
//     browser = await chromium.launch();
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });

//   afterAll(async () => {
//     await browser.close();
//   });

//   test('has title', async () => {
//     await page.goto('http://localhost:5432');

//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveTitle(/Twitter/);
//   });

//   // test('get started link', async () => {
//   //   await page.goto('<https://playwright.dev/>');

//   //   // Click the get started link.
//   //   await page.getByRole('link', { name: 'Get started' }).click();

//   //   // Expects the URL to contain intro.
//   //   await expect(page).toHaveURL(/.*intro/);
//   // });
// });
