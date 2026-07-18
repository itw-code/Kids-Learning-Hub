import { test, expect } from '@playwright/test';

test.describe('iOS PWA Visual Showcase & Protections Test', () => {

  test('Visual Showcase: Slow Hub Navigation and Exploration', async ({ page }) => {
    // 1. Visit Portal root
    await page.goto('/');
    await page.waitForTimeout(1000);

    // 2. Click Alphabet Card
    const alphabetCard = page.locator('span:has-text("Belajar Abjad")');
    await expect(alphabetCard).toBeVisible();
    await alphabetCard.click();
    await expect(page).toHaveURL(/\/alphabet/);
    await page.waitForTimeout(1000);

    // 3. Interact with letter A
    const letterA = page.locator('div[data-letter="A"]');
    await expect(letterA).toBeVisible();
    await letterA.click();
    await page.waitForTimeout(1000);

    // 4. Interact with letter B
    const letterB = page.locator('div[data-letter="B"]');
    await expect(letterB).toBeVisible();
    await letterB.click();
    await page.waitForTimeout(1000);

    // 5. Navigate back to Hub
    const homeBtn = page.locator('a[href="/"]');
    await homeBtn.click();
    await expect(page).toHaveURL(/localhost/);
    await page.waitForTimeout(1000);
  });

  test('iOS Safari Protections: Touch Action & Phonics Configuration', async ({ page }) => {
    // Print all browser logs and errors to the terminal
    page.on('console', (msg) => console.log(`[Showcase Browser Console] ${msg.type()}: ${msg.text()}`));
    page.on('pageerror', (err) => console.error(`[Showcase Browser PageError] ${err.message}`));

    // 1. Navigate to Alphabet App via root
    await page.goto('/');
    const alphabetCard = page.locator('span:has-text("Belajar Abjad")');
    await alphabetCard.click();
    await expect(page).toHaveURL(/\/alphabet/);
    
    // Wait for event handlers to bind and hydrate
    await page.waitForTimeout(1000);

    // 2. Proving Touch Gesture Locking: Assert that 'touch-action: none' is actively applied
    // This locks Safari's multi-touch screen pinch and swipe gestures from pulling down or scrolling the viewport
    const gridContainer = page.locator('.grow.justify-center');
    const touchAction = await gridContainer.evaluate((el) => window.getComputedStyle(el).touchAction);
    expect(touchAction).toBe('none');

    // 3. Proving Indonesian Voiceover: Mock Speech API and assert id-ID locale parameter
    await page.evaluate(() => {
      (window as any).showcaseSpeechLog = [];
      window.speechSynthesis.speak = (utterance: SpeechSynthesisUtterance) => {
        (window as any).showcaseSpeechLog.push({
          text: utterance.text,
          lang: utterance.lang
        });
      };
    });

    // Click Letter C
    const letterC = page.locator('div[data-letter="C"]');
    await expect(letterC).toBeVisible();
    await letterC.click();

    // Verify it triggers Indonesian voiceover parameters
    await page.waitForFunction(() => {
      const logs = (window as any).showcaseSpeechLog || [];
      return logs.length > 0 && logs.some((l: any) => l.text.toLowerCase() === 'c' || l.text.toLowerCase().includes('abjad'));
    }, { timeout: 4000 }).catch((e) => {
      console.warn('showcase waitForFunction timed out. Current logs:', e);
    });

    const speechLogs = await page.evaluate(() => (window as any).showcaseSpeechLog || []);
    console.log('Showcase final speechLogs:', JSON.stringify(speechLogs));
    
    const match = speechLogs.find((log: any) => log.text.toLowerCase() === 'c' || log.text.toLowerCase().includes('abjad'));
    
    expect(match).toBeDefined();
    expect(match.lang).toBe('id-ID'); // Verifies language parameter is strictly locked to Indonesian
  });
});
