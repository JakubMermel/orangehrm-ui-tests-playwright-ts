import { test, expect } from '@playwright/test';

test('open login page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});