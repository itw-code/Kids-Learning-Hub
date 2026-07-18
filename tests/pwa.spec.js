import { test, expect } from '@playwright/test';

// Override to allow service workers in this PWA test file
test.use({ serviceWorkers: 'allow' });

test.describe('PWA Service Worker & Caching', () => {
  test('should register service worker and work offline with clean URLs', async ({ context, page }) => {
    // Print all browser logs and errors to the terminal
    page.on('console', (msg) => console.log(`[PWA Browser Console] ${msg.type()}: ${msg.text()}`));
    page.on('pageerror', (err) => console.error(`[PWA Browser PageError] ${err.message}`));

    // Navigate online to trigger SW registration
    await page.goto('/');

    // Verify service worker registers and activates
    const isSwRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registration = await navigator.serviceWorker.ready;
      return registration.active !== null;
    });
    expect(isSwRegistered).toBe(true);

    // Wait for assets to be cached (sw.js installs cache)
    await page.waitForTimeout(2500);

    // Go offline
    await context.setOffline(true);

    // Navigate to a cached clean URL (e.g. /apps/spelling/)
    const offlineResponse = await page.goto('/apps/spelling/');
    expect(offlineResponse?.status()).toBe(200);

    // Verify Spelling game page components render offline
    const title = page.locator('#main-menu h1');
    await expect(title).toBeVisible();

    // Navigate to an uncached route to verify sw.js SPA fallback to /index.html
    const fallbackResponse = await page.goto('/apps/non-existent-app-fallback/');
    expect(fallbackResponse?.status()).toBe(200);

    // The returned content should be index.html which contains the main hub title
    const mainTitle = page.locator('h1', { hasText: 'Hub Belajar Anak' });
    await expect(mainTitle).toBeVisible();
  });
});
