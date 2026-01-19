import { expect, test } from '@playwright/test';

test('homepage renders', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: 'Marketing Site Starter' })).toBeVisible();
});

