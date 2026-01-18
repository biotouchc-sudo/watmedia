import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/WATMEDIA/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=الخدمات');
  await expect(page).toHaveURL(/\/services/);
});
