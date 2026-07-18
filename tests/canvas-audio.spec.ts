import { test, expect, Page } from '@playwright/test';

// Bypasses Chrome audio autoplay restrictions
test.use({
  launchOptions: {
    args: ['--autoplay-policy=no-user-gesture-required']
  }
});

/**
 * Helper to click inside a <canvas> (Konva Stage) based on coordinate offsets
 */
export async function clickKonvaShape(page: Page, selector: string, x: number, y: number) {
  const canvas = page.locator(selector);
  const box = await canvas.boundingBox();
  if (!box) {
    throw new Error(`Target canvas selector ${selector} not found or invisible`);
  }
  // Click relative to top-left of canvas element
  await page.mouse.click(box.x + x, box.y + y);
}

test.describe('Speech Synthesis & Interactive Canvas E2E Tests', () => {

  test('should mock speech synthesis and verify ID-id configuration params', async ({ page }) => {
    // Print all browser logs and errors to the terminal
    page.on('console', (msg) => console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`));
    page.on('pageerror', (err) => console.error(`[Browser PageError] ${err.message}`));

    // Navigate from root to avoid static server 404 routing mismatch
    await page.goto('/');
    const alphabetCard = page.locator('span:has-text("Belajar Abjad")');
    await alphabetCard.click();
    await expect(page).toHaveURL(/\/alphabet/);
    
    // Wait for React rendering and event bindings to hydrate
    await page.waitForTimeout(1000);

    // Inject speech mock monitoring into browser global window
    await page.evaluate(() => {
      (window as any).speakTracker = [];
      
      // Override speak function
      window.speechSynthesis.speak = (utterance: SpeechSynthesisUtterance) => {
        (window as any).speakTracker.push({
          text: utterance.text,
          lang: utterance.lang,
          pitch: utterance.pitch,
          rate: utterance.rate
        });

        // Resolve speaking immediately
        setTimeout(() => {
          if (utterance.onend) {
            utterance.onend(new SpeechSynthesisEvent('end', { utterance }));
          }
        }, 10);
      };
    });

    // Trigger target letter click in Alphabet screen (div[data-letter="A"])
    const letterACard = page.locator('div[data-letter="A"]');
    await expect(letterACard).toBeVisible();
    await letterACard.click();

    // Wait for the speech call log to be captured asynchronously
    await page.waitForFunction(() => {
      const tracker = (window as any).speakTracker || [];
      return tracker.some((log: any) => log.text.toLowerCase().includes('a') || log.text.toLowerCase().includes('abjad'));
    }, { timeout: 4000 }).catch((e) => {
      console.warn('waitForFunction timed out. Checking current tracker contents:', e);
    });

    // Verify speech logs inside the context
    const speakLogs = await page.evaluate(() => (window as any).speakTracker || []);
    console.log('Final captured speakLogs:', JSON.stringify(speakLogs));

    // Find the actual letter speech call (ignoring Windows wake-up primer logs)
    const speechCall = speakLogs.find((log: any) => log.text.toLowerCase().includes('a') || log.text.toLowerCase().includes('abjad'));
    expect(speechCall).toBeDefined();
    expect(speechCall.lang).toBe('id-ID');
    expect(speechCall.text.toLowerCase()).toContain('a');
  });

  test('should verify coordinate-based Konva canvas interactions', async ({ page }) => {
    // Navigate from root to avoid static server 404 routing mismatch
    await page.goto('/');
    const shapesCard = page.locator('span:has-text("Bentuk & Warna")');
    await shapesCard.click();
    await expect(page).toHaveURL(/\/shapes/);

    // Select the Leaf Sort game from the dashboard
    const leafSortCard = page.locator('button:has-text("Leaf Sort")');
    await expect(leafSortCard).toBeVisible();
    await leafSortCard.click();

    // Wait for the Stage canvas to render
    const canvasElement = page.locator('canvas').first();
    await expect(canvasElement).toBeVisible();

    // Call clicking function inside Konva canvas
    await clickKonvaShape(page, 'canvas', 200, 200);
  });
});
