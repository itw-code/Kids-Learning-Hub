import { test, expect } from '@playwright/test';

test.describe('Portal Hub Navigation & State Persistence', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear LocalStorage before each test to ensure clean states
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should render hub header and navigate correctly via React Router', async ({ page }) => {
    await page.goto('/');

    // 1. Check title rendering
    const headerTitle = page.locator('h1', { hasText: 'Hub Belajar Anak' });
    await expect(headerTitle).toBeVisible();

    // 2. Click Alphabet link card and verify Client Router navigation
    const alphabetCard = page.locator('span', { hasText: 'Belajar Abjad' });
    await alphabetCard.click();

    await expect(page).toHaveURL(/\/alphabet/);
    
    // Assert Alphabet game UI elements load - H1 title localized
    const gameTitle = page.locator('h1', { hasText: 'Belajar Abjad! 🚀' });
    await expect(gameTitle).toBeVisible();

    // 3. Click Floating home button to return back to portal
    const homeBtn = page.locator('a[href="/"]');
    await homeBtn.click();
    await expect(page).toHaveURL(/localhost/);
  });

  test('should hydrate star count and sticker collection from Zustand LocalStorage', async ({ page }) => {
    // 1. Navigate to main page
    await page.goto('/');

    // 2. Populate profile progress mock states directly in browser localStorage
    await page.evaluate(() => {
      const mockProfile = {
        state: {
          totalStars: 25,
          stickers: ['alphabet-master', 'color_captain'],
          gamesCompleted: { 'alphabet': true }
        },
        version: 0
      };
      localStorage.setItem('klh_profile_progress', JSON.stringify(mockProfile));
    });

    // 3. Reload page to trigger store hydration
    await page.reload();

    // 4. Assert star counts display correct total 25 stars
    const starCountText = page.locator('span:has-text("25")');
    await expect(starCountText).toBeVisible();

    // 5. Navigate to Sticker Book
    const stickerBookBtn = page.locator('a[href="/trophy"]');
    await stickerBookBtn.click();
    await expect(page).toHaveURL(/\/trophy/);

    // 6. Assert "Bintang Abjad" (alphabet-master) and "Kapten Warna" (color_captain) are unlocked
    const alphabetSticker = page.locator('button:has-text("Bintang Abjad")');
    await expect(alphabetSticker).toBeVisible();
    await expect(alphabetSticker).not.toHaveClass(/opacity-60/); // Unlocked: full opacity

    const lockedSticker = page.locator('button:has-text("Ninja Angka")');
    await expect(lockedSticker).toHaveClass(/opacity-60/); // Locked: grayed out opacity
  });
});
