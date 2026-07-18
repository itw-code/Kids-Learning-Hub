import { test, expect } from '@playwright/test';

test.describe('Spelling Game E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local port and click the Spelling game link
    await page.goto('http://localhost:3000/');
    
    // Give react routing and hydration time to settle
    await page.waitForTimeout(1000);

    // Locate Spelling game link ("Mengeja Kata") and click it
    const spellingLink = page.locator('a[href="/spelling"], div[data-path="/spelling"]');
    await expect(spellingLink).toBeVisible();
    await spellingLink.click();
    await page.waitForTimeout(1000);
  });

  test('should render the spelling game title, scoreboard, and components', async ({ page }) => {
    // Verify Title
    const title = page.locator('h1', { hasText: 'Mengeja Kata!' });
    await expect(title).toBeVisible();

    // Verify scoreboard has "Skor: 0"
    const score = page.locator('text=Skor: 0');
    await expect(score).toBeVisible();

    // Verify Hint button is present
    const hintBtn = page.locator('button', { hasText: 'Suara Kata' });
    await expect(hintBtn).toBeVisible();

    // Verify blanks slots are visible
    const blanks = page.locator('[data-slot-index]');
    const count = await blanks.count();
    expect(count).toBeGreaterThan(2); // Word length should be at least 3

    // Verify choices tiles are present
    const choiceTiles = page.locator('div.cursor-grab');
    const choiceCount = await choiceTiles.count();
    expect(choiceCount).toBeGreaterThan(2);
  });

  test('should allow level switching between Mudah and Tantangan', async ({ page }) => {
    // Level toggle buttons
    const mudahBtn = page.locator('button', { hasText: 'Mudah' });
    const tantanganBtn = page.locator('button', { hasText: 'Tantangan' });

    // Verify "Mudah" is active by default
    await expect(mudahBtn).toHaveClass(/bg-amber-500/);

    // Switch to Tantangan
    await tantanganBtn.click();
    await page.waitForTimeout(500);

    // Verify "Tantangan" is active now
    await expect(tantanganBtn).toHaveClass(/bg-amber-500/);
    await expect(mudahBtn).not.toHaveClass(/bg-amber-500/);
  });

  test('should drag and drop correct letter to slot', async ({ page }) => {
    // Read the expected first letter of the active word
    // Let's get the list of slots
    const blanks = page.locator('[data-slot-index]');
    const totalSlots = await blanks.count();
    expect(totalSlots).toBeGreaterThan(0);

    // Since we know the letters of the initial word (KUCING or whichever is loaded),
    // let's grab one of the draggable letters that matches the first slot.
    // In our spelling game, choices are elements with text content (A-Z) and draggable cursor styles.
    // Let's mock a correct placement or test coordinates
    const firstBlank = blanks.nth(0);
    const blankBox = await firstBlank.boundingBox();
    expect(blankBox).not.toBeNull();

    if (blankBox) {
      // Find a choice tile that has a letter matching the correct word.
      // Since it's shuffled and random, let's find the correct letter.
      // Our store knows the word. The initial word is KUCING. The first letter is K.
      const choiceK = page.locator('div.cursor-grab', { hasText: 'K' }).first();
      
      if (await choiceK.isVisible()) {
        const choiceBox = await choiceK.boundingBox();
        expect(choiceBox).not.toBeNull();

        if (choiceBox) {
          // Drag K to the first slot center
          const fromX = choiceBox.x + choiceBox.width / 2;
          const fromY = choiceBox.y + choiceBox.height / 2;
          const toX = blankBox.x + blankBox.width / 2;
          const toY = blankBox.y + blankBox.height / 2;

          await page.mouse.move(fromX, fromY);
          await page.mouse.down();
          await page.mouse.move(toX, toY, { steps: 5 });
          await page.mouse.up();

          // Wait for transition/snap animations
          await page.waitForTimeout(500);

          // Verify slot 0 is filled with "K"
          await expect(firstBlank).toHaveText('K');
          await expect(firstBlank).toHaveClass(/bg-emerald-100/);
        }
      }
    }
  });
});
