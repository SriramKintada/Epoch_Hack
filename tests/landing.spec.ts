import { test, expect } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Epoch/i);
});

test('navigation to apply page', async ({ page }) => {
  await page.goto('/apply');
  await expect(page.locator('form')).toBeVisible();
});
