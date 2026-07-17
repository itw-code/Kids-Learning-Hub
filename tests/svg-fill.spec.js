import { test, expect } from '@playwright/test';

test.describe('SVG TapToFill Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apps/coloring/');
    await page.waitForSelector('.svg-fill-container');
  });

  test('should fill SVG path on click and preserve fill on changing selectedColor', async ({ page }) => {
    const svgContainer = page.locator('.svg-fill-container');
    
    // Select the first fillable path
    const fillablePath = svgContainer.locator('.fillable').first();
    await expect(fillablePath).toBeVisible();

    // Verify initial fill (should be white #ffffff)
    const initialFill = await fillablePath.getAttribute('fill');
    expect(initialFill).toBe('#ffffff');

    // Dispatch a native click event to the first fillable shape directly in the browser DOM
    await page.evaluate(() => {
      const firstShape = document.querySelector('.svg-fill-container .fillable');
      if (firstShape) {
        firstShape.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });

    // Verify fill attribute has updated to #ff595e
    await expect(fillablePath).toHaveAttribute('fill', '#ff595e');

    // Select a new color from the palette: Orange (#ff924c)
    const orangePaletteBtn = page.locator('button[aria-label="Select color #ff924c"]');
    await expect(orangePaletteBtn).toBeVisible();
    await orangePaletteBtn.click();

    // Verify the previously filled path still maintains the #ff595e color (no reconciliation reset!)
    await expect(fillablePath).toHaveAttribute('fill', '#ff595e');

    // Dispatch a click event to the second fillable shape
    await page.evaluate(() => {
      const secondShape = document.querySelectorAll('.svg-fill-container .fillable')[1];
      if (secondShape) {
        secondShape.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });

    // Verify Shape 2 is filled with Orange, and Shape 1 remains red
    const secondPath = svgContainer.locator('.fillable').nth(1);
    await expect(secondPath).toHaveAttribute('fill', '#ff924c');
    await expect(fillablePath).toHaveAttribute('fill', '#ff595e');
  });
});
