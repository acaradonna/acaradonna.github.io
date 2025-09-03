import { test, expect } from '@playwright/test';

const expectVisibleCards = async (page) => {
  const cards = page.locator('#featured .card');
  await expect(cards.first()).toBeVisible();
  await expect(cards).toHaveCountGreaterThan(0);
};

// Add helper to expect count > 0
expect.extend({
  async toHaveCountGreaterThan(locator, min) {
    const count = await locator.count();
    const pass = count > min;
    return {
      pass,
      message: () => `expected count ${count} to be > ${min}`,
    };
  },
});

test('homepage loads and shows featured cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /^hi, i'm alex\./i })).toBeVisible();
  // Wait for client hydration to potentially replace content
  await page.waitForTimeout(500);
  await expectVisibleCards(page);
  // Art toggle and palette cycler exist
  await expect(page.locator('#toggle-art')).toBeVisible();
  await expect(page.locator('#cycle-palette')).toBeVisible();
  // Focus and contrast toggles work
  await page.locator('#toggle-focus').click();
  await expect(page.locator('body.focus-mode')).toBeVisible();
  await page.locator('#toggle-contrast').click();
  await expect(page.locator('body.high-contrast')).toBeVisible();
});

test('projects page lists projects', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible();
  const grid = page.locator('.grid .card');
  await expect(grid.first()).toBeVisible();
});
