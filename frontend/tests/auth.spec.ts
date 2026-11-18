import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login page and allow input', async ({ page }) => {
    await page.goto('/login');

    // Check if we are on the login page
    await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();

    // Fill in email and password
    await page.locator('form input[name="email"]').fill('test@example.com');
    await page.locator('input[name="password"]').fill('password123');

    // Check login button
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
  });

  test('should navigate to signup from login', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Create your account' }).click();
    await expect(page).toHaveURL(/\/signup/);
  });
});
