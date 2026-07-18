import { test, expect } from '@playwright/test';

test.describe('Canvas Coloring Component (Crayon Brush)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the coloring app
    await page.goto('/apps/coloring/');
    // Wait for the app page shell to be visible
    await page.waitForSelector('.coloring-dashboard');
  });

  test('should draw brush strokes correctly in crayon mode and preserve strokes on mouseUp', async ({ page }) => {
    // Switch to Crayon Brush mode
    const crayonBtn = page.locator('button', { hasText: 'Krayon' });
    await expect(crayonBtn).toBeVisible();
    await crayonBtn.click();

    // Verify Crayon canvas container loads
    const canvas = page.locator('.canvas-wrapper canvas').first();
    await expect(canvas).toBeVisible();

    // Wait for Blob images/templates to load and render onto hidden and main canvases
    await page.waitForTimeout(1000);

    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();

    // Calculate viewport drawing coordinates proportionally based on active bounding width/height
    // For the Lion template, the body is centered around cx=400 cy=300 in canvas coordinate space (800x600).
    const startX = box.x + (box.width * 400) / 800;
    const startY = box.y + (box.height * 300) / 600;
    const endX = box.x + (box.width * 450) / 800;
    const endY = box.y + (box.height * 350) / 600;

    // Perform drawing gesture
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 10 });
    await page.mouse.up();

    // Wait a brief tick for outline rendering
    await page.waitForTimeout(300);

    // Verify programmatic pixel color at (420, 320) relative to canvas has color data (not clean transparent/white)
    // The default color is Red #ff595e (RGB: 255, 89, 94)
    const pixelColor = await page.evaluate(() => {
      const canvasEl = document.querySelector('.canvas-wrapper canvas');
      const ctx = canvasEl.getContext('2d');
      // Read pixel inside the stroke path (relative offset)
      const pixel = ctx.getImageData(420, 320, 1, 1).data;
      return { r: pixel[0], g: pixel[1], b: pixel[2], a: pixel[3] };
    });

    // Verify drawing recorded color pixels successfully (Red channel has active content, green is low)
    expect(pixelColor.r).toBeGreaterThan(150);
    expect(pixelColor.g).toBeLessThan(120);
    expect(pixelColor.b).toBeLessThan(120);
  });
});
