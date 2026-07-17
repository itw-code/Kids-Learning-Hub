import { test, expect } from '@playwright/test';

// Chromium flags to bypass Autoplay blockers
test.use({
  launchOptions: {
    args: ['--autoplay-policy=no-user-gesture-required']
  }
});

test.describe('Audio & Speech Synthesis Playback', () => {
  test('should load music files and duck volume during speaking events', async ({ page }) => {
    // Navigate to an app that loads speech-module.js
    await page.goto('/apps/coloring/');

    let musicAssetsLoaded = false;
    // Intercept music network response and assert it is fetched successfully
    page.on('response', (response) => {
      const url = response.url();
      if (url.endsWith('.mp3')) {
        expect([200, 206]).toContain(response.status());
        musicAssetsLoaded = true;
      }
    });

    // Locate the music control button (injected by speech-module.js)
    const musicBtn = page.locator('#music-toggle-btn');
    await expect(musicBtn).toBeVisible();

    // Click to start background music
    await musicBtn.click();

    // Verify audio element state inside the browser context
    const audioState = await page.evaluate(() => {
      const audio = document.getElementById('bg-music');
      return { paused: audio.paused, volume: audio.volume };
    });
    expect(audioState.paused).toBe(false);
    expect(audioState.volume).toBeCloseTo(0.3); // normal initial volume

    // Mock speech synthesis to track calls and trigger immediate completion in CI
    await page.evaluate(() => {
      window.speakUtterances = [];
      window.speechSynthesis.speak = (utterance) => {
        window.speakUtterances.push(utterance.text);
        
        // Fast forward the speaking callback after 200ms
        setTimeout(() => {
          if (utterance.onend) utterance.onend();
        }, 200);
      };
    });

    // Trigger speak text
    await page.evaluate(() => {
      window.speakText('Hello kids, let\'s learn!');
    });

    // Check that volume was immediately ducked to 0.1
    const duckedVolume = await page.evaluate(() => {
      return document.getElementById('bg-music').volume;
    });
    expect(duckedVolume).toBeCloseTo(0.1);

    // Wait for mock speech to finish
    await page.waitForTimeout(300);

    // Check that volume was restored to 0.5 when speaking stops
    const restoredVolume = await page.evaluate(() => {
      return document.getElementById('bg-music').volume;
    });
    expect(restoredVolume).toBeCloseTo(0.5);

    // Assert speech parameters
    const spokenTexts = await page.evaluate(() => window.speakUtterances);
    expect(spokenTexts).toContain('Hello kids, let\'s learn!');
  });
});
