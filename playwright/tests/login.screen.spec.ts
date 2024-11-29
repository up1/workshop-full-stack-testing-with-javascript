import { test, expect } from '@playwright/test';

test('Check login box element screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('#login-page')).toHaveScreenshot('login-box.png');
});
