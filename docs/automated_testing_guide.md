# Automated Testing Guide for Kids Learning Hub PWA

This guide details how to implement automated browser testing using [Playwright](https://playwright.dev/) for the Kids Learning Hub Progressive Web App (PWA). It covers canvas drawing components, SVG manipulation, PWA service worker caching, audio/music playback, and includes a detailed step-by-step implementation plan.

---

## Table of Contents
1. [Testing Canvas-Based Drawing (`CanvasMask.jsx`)](#1-testing-canvas-based-drawing-canvasmaskjsx)
2. [Testing SVG Manipulation (`TapToFill.jsx`)](#2-testing-svg-manipulation-taptofilljsx)
3. [Testing PWA Features and Caching (`sw.js`)](#3-testing-pwa-features-and-caching-swjs)
4. [Testing Audio & Speech Playback (`speech-module.js`)](#4-testing-audio--speech-playback-speech-modulejs)
5. [Implementation Plan & Configuration](#5-implementation-plan--configuration)
6. [Official Documentation & References](#6-official-documentation--references)

---

## 1. Testing Canvas-Based Drawing (`CanvasMask.jsx`)

### Challenges
The `CanvasMask.jsx` component uses multiple layered HTML5 canvas elements (visible, target ID map, mask, and temporary canvas). Drawing is constrained within the outlines by looking up target coordinates on a hidden ID-map canvas and drawing via a composited canvas mask. 
Because the canvas renders SVGs dynamically via Blobs, tests must:
1. Wait for canvas initialization and blob image loads.
2. Simulate dragging gestures with exact coordinate math.
3. Validate canvas pixels directly (visual comparison vs. programmatic pixel checks).

### Testing Strategy
* **Pointer Simulation**: Use Playwright's `page.mouse` API to dispatch coordinate-precise dragging motions.
* **Verification Methods**:
  1. **Visual Regression Testing**: Compare canvas screenshots against a base reference image using `expect(locator).toHaveScreenshot()`. This is great for overall layout verification.
  2. **Programmatic Pixel Evaluation (Highly Recommended)**: Query the canvas context directly inside the browser using `page.evaluate()` to extract specific coordinates and verify their RGB values. This is less fragile than visual snapshots across different host OS platforms.

### Playwright Test Code Example
```javascript
import { test, expect } from '@playwright/test';

test.describe('Canvas Drawing Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to coloring app and wait for canvas component to load
    await page.goto('/apps/coloring/');
    await page.waitForSelector('.canvas-wrapper canvas');
  });

  test('should draw brush strokes correctly inside bounding lines', async ({ page }) => {
    const canvas = page.locator('.canvas-wrapper canvas').first();
    const box = await canvas.boundingClientRect();
    
    // Choose red color from the palette
    const redPaletteBtn = page.locator('.color-palette button[data-color="#ff0000"]');
    if (await redPaletteBtn.count() > 0) {
      await redPaletteBtn.click();
    }

    // Coordinates relative to the viewport
    const startX = box.x + 200;
    const startY = box.y + 150;
    const endX = box.x + 250;
    const endY = box.y + 180;

    // Simulate drawing gesture
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 10 }); // Move slowly to register strokes
    await page.mouse.up();

    // 1. Programmatic Pixel Verification: Verify pixel value at (220, 160) is Red
    const canvasRelativeX = 220;
    const canvasRelativeY = 160;
    const pixelColor = await page.evaluate(({ x, y }) => {
      const canvasEl = document.querySelector('.canvas-wrapper canvas');
      const ctx = canvasEl.getContext('2d');
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      return { r: pixel[0], g: pixel[1], b: pixel[2], a: pixel[3] };
    }, { x: canvasRelativeX, y: canvasRelativeY });

    // Assert that the drawing color is applied (Red: 255, 0, 0)
    // We allow a small tolerance threshold due to antialiasing
    expect(pixelColor.r).toBeGreaterThan(200);
    expect(pixelColor.g).toBeLessThan(50);
    expect(pixelColor.b).toBeLessThan(50);

    // 2. Visual Regression Verification (optional fallback)
    await expect(canvas).toHaveScreenshot('brush-stroke-red.png', {
      maxDiffPixelRatio: 0.02 // Allow up to 2% pixel differences (antialiasing)
    });
  });
});
```

---

## 2. Testing SVG Manipulation (`TapToFill.jsx`)

### Challenges
The `TapToFill.jsx` component injects SVG templates via standard DOM manipulation (`innerHTML`). It intercepts clicks on outer containers, identifies clicked paths, checks for a `.fillable` class, and dynamically updates the `fill` attribute. 
Crucially, it uses `colorRef` so that updating the `selectedColor` does *not* trigger a clean re-injection of the SVG, thereby preserving already colored elements.
Tests must:
1. Verify clicking a `.fillable` shape updates the `fill` attribute.
2. Verify that changing colors (re-rendering the React parent component) does *not* reset previously filled shapes.

### Testing Strategy
* **Attribute Assertions**: Use Playwright's `expect(locator).toHaveAttribute()` to inspect individual SVG elements before and after interactions.
* **State Persistence Testing**:
  1. Select Color A $\to$ Click Shape 1 $\to$ Assert Shape 1 fill is Color A.
  2. Select Color B (triggers prop change and component re-render) $\to$ Assert Shape 1 *still* has Color A.
  3. Click Shape 2 $\to$ Assert Shape 2 has Color B.

### Playwright Test Code Example
```javascript
import { test, expect } from '@playwright/test';

test.describe('SVG TapToFill Component', () => {
  test('should fill shapes and persist colors on parent state updates', async ({ page }) => {
    await page.goto('/apps/coloring/'); // or target testing page
    
    const svgContainer = page.locator('.svg-fill-container');
    await expect(svgContainer).toBeVisible();

    // Select color red (#ff0000)
    await page.click('.color-palette [data-color="#ff0000"]');

    // Locate the first fillable path in the SVG
    const firstShape = svgContainer.locator('svg .fillable').first();
    await expect(firstShape).toBeVisible();
    
    // Check initial fill state (usually empty, white, or original color)
    const initialFill = await firstShape.getAttribute('fill');

    // Click to fill the shape with red
    await firstShape.click();
    await expect(firstShape).toHaveAttribute('fill', '#ff0000');

    // Select color blue (#0000ff) — this triggers a parent state update & re-render of TapToFill
    await page.click('.color-palette [data-color="#0000ff"]');

    // Verify Shape 1 still keeps the red fill (it should NOT reset!)
    await expect(firstShape).toHaveAttribute('fill', '#ff0000');

    // Find a second fillable path and click it
    const secondShape = svgContainer.locator('svg .fillable').nth(1);
    await secondShape.click();

    // Verify Shape 2 is filled with blue, and Shape 1 remains red
    await expect(secondShape).toHaveAttribute('fill', '#0000ff');
    await expect(firstShape).toHaveAttribute('fill', '#ff0000');
  });
});
```

---

## 3. Testing PWA Features and Caching (`sw.js`)

### Challenges
Service Workers (`sw.js`) run in a background thread and require a secure context (like `localhost` or `HTTPS`). The worker intercept-caches pages defined in its `ASSETS` array, including directory paths like `/apps/alphabet/` (clean URLs).
Tests must:
1. Ensure the Service Worker installs and registers successfully.
2. Force the browser offline and verify pages load directly from cache.
3. Verify that clean URLs (e.g., `/apps/numbers/` without `index.html`) resolve correctly offline.
4. Verify fallback to `/index.html` when offline navigation fails on uncached routes.

### Testing Strategy
* **Service Worker Readiness**: Evaluate the `navigator.serviceWorker` API inside the page context.
* **Offline Emulation**: Use Playwright's `browserContext.setOffline(true)` to simulate network disconnects.
* **Resource Auditing**: Use Playwright's network event listeners (`page.on('request')`) to verify whether assets are fetched from network or served by the Service Worker.

### Playwright Test Code Example
```javascript
import { test, expect } from '@playwright/test';

test.describe('PWA Service Worker & Offline Caching', () => {
  test('should register service worker, cache clean URLs, and work offline', async ({ context, page }) => {
    // 1. Visit the home page in online mode
    await page.goto('/');

    // Wait for the service worker to register and reach 'activated' state
    const isSwRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registration = await navigator.serviceWorker.ready;
      return registration.active !== null;
    });
    expect(isSwRegistered).toBe(true);

    // Wait a brief period to ensure CACHE_NAME has completed cache.addAll(ASSETS)
    await page.waitForTimeout(2000);

    // 2. Go offline
    await context.setOffline(true);

    // 3. Test clean URL navigation offline (e.g. /apps/alphabet/)
    const cleanUrl = '/apps/alphabet/';
    const response = await page.goto(cleanUrl);
    
    // Assert response was successful and served from Service Worker cache
    expect(response?.status()).toBe(200);
    
    // Verify specific cached elements are visible offline
    await expect(page.locator('h1')).toBeVisible();

    // 4. Test uncached route fallback
    // sw.js intercepts failing navigations and falls back to /index.html
    const uncachedUrl = '/apps/non-existent-app/';
    const fallbackResponse = await page.goto(uncachedUrl);
    expect(fallbackResponse?.status()).toBe(200);
    
    // The content served should match the main shell (index.html)
    await expect(page.locator('#main-hub-title')).toBeVisible();
  });
});
```

---

## 4. Testing Audio & Speech Playback (`speech-module.js`)

### Challenges
The `speech-module.js` contains a global speech synthesis manager and a global background music player.
1. **Autoplay Blocking**: Modern browsers reject playing audio elements (`#bg-music`) before a user gesture.
2. **Speech Synthesis Engines**: Headless CI environments frequently lack speech synthesis voices, causing `window.speechSynthesis` calls to stall or fail.
3. **Audio Ducking**: `window.speakText` lowers the volume of `#bg-music` to `0.1` and restores it to `0.5` upon finishing.

### Testing Strategy
* **Launch Arguments**: Pass `--autoplay-policy=no-user-gesture-required` to Chromium during startup to disable media blocking in tests.
* **Mocking/Spying on SpeechSynthesis**: Override `window.speechSynthesis.speak` to track calls, simulate text-to-speech timing, and trigger `onend` callbacks programmatically.
* **Music Ducking Spies**: Assert volume adjustments on `#bg-music` before and after speech triggers.
* **Audio Asset Validation**: Intercept network requests to verify that `.mp3` files load successfully with HTTP status code 200 or 206 (Partial Content).

### Playwright Test Code Example
```javascript
import { test, expect } from '@playwright/test';

// Use Chromium launch args to bypass Autoplay gesture restrictions
test.use({
  launchOptions: {
    args: ['--autoplay-policy=no-user-gesture-required']
  }
});

test.describe('Audio & Speech playback', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load music assets and adjust volume during speech ducking', async ({ page }) => {
    // 1. Intercept mp3 music requests to verify assets exist
    let musicFileLoaded = false;
    page.on('response', response => {
      const url = response.url();
      if (url.endsWith('.mp3')) {
        expect([200, 206]).toContain(response.status());
        musicFileLoaded = true;
      }
    });

    // Toggle background music play
    const musicBtn = page.locator('#music-toggle-btn');
    await expect(musicBtn).toBeVisible();
    await musicBtn.click();

    // Verify audio element is playing and volume is set to baseline (0.3 in source)
    const audioState = await page.evaluate(() => {
      const audio = document.getElementById('bg-music');
      return { paused: audio.paused, volume: audio.volume };
    });
    expect(audioState.paused).toBe(false);
    expect(audioState.volume).toBeCloseTo(0.3);

    // 2. Mock SpeechSynthesis to prevent CI/Headless blocking and track calls
    await page.evaluate(() => {
      window.speakUtterances = [];
      window.speechSynthesis.speak = (utterance) => {
        window.speakUtterances.push(utterance.text);
        
        // Simulating the speaking window, trigger end after 500ms
        setTimeout(() => {
          if (utterance.onend) utterance.onend();
        }, 500);
      };
    });

    // 3. Trigger speech via global function
    await page.evaluate(() => {
      window.speakText('Welcome to Kids Learning Hub!');
    });

    // Check that volume was immediately "ducked" to 0.1
    const duckedVolume = await page.evaluate(() => {
      return document.getElementById('bg-music').volume;
    });
    expect(duckedVolume).toBeCloseTo(0.1);

    // Wait for the mock speech synthesis onend callback to complete
    await page.waitForTimeout(600);

    // Check that volume is restored back to normal (0.5 when speaking stops)
    const restoredVolume = await page.evaluate(() => {
      return document.getElementById('bg-music').volume;
    });
    expect(restoredVolume).toBeCloseTo(0.5);

    // Assert that the mock speech synthesis captured our text
    const spokenTexts = await page.evaluate(() => window.speakUtterances);
    expect(spokenTexts).toContain('Welcome to Kids Learning Hub!');
    expect(musicFileLoaded).toBe(true);
  });
});
```

---

## 5. Implementation Plan & Configuration

To integrate these tests into the Kids Learning Hub repository, follow this step-by-step implementation plan:

### Step 1: Install Playwright
Install the Playwright test runner and necessary browser binaries in the root directory:
```bash
rtk npm i -D @playwright/test
rtk npx playwright install chromium
```

### Step 2: Configure Playwright (`playwright.config.js`)
Create a configuration file in the project root to automate server launching, allow service workers, and pass Chrome flags:

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    serviceWorkers: 'allow', // Explicitly allow SW registration
    launchOptions: {
      args: ['--autoplay-policy=no-user-gesture-required'] // Bypass autoplay rules
    }
  },
  // Automatically start local dev/prod server before tests run
  webServer: {
    command: 'npm run start', // command to run the local server
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
```

### Step 3: Write Test Files
Create a new `tests` folder in the root directory and organize testing scripts:
*   `tests/canvas.spec.js` (Canvas drawing, pointer dragging, pixel evaluation)
*   `tests/svg-fill.spec.js` (Tap to Fill SVG validation, state persistence)
*   `tests/pwa.spec.js` (Service Worker caching, offline modes, clean URLs)
*   `tests/audio.spec.js` (Speech synthesis mocking, audio loading, ducking logic)

### Step 4: Add npm Test Scripts
Update the root `package.json` to include scripts for running tests:
```json
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:debug": "playwright test --debug"
}
```

### Step 5: Continuous Integration (GitHub Actions)
Add a workflow file `.github/workflows/playwright.yml` to automatically verify components on each PR/push:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

---

## 6. Official Documentation & References

For further details on APIs used in this guide, refer to the following official documentation pages:

*   **Playwright Visual Regression Testing**: [Playwright - Visual Comparisons Docs](https://playwright.dev/docs/test-snapshots)
*   **Playwright Offline Emulation**: [Playwright - Network Emulation Docs](https://playwright.dev/docs/emulation#network)
*   **Playwright Network Interception**: [Playwright - Network Intercepting & Mocking Docs](https://playwright.dev/docs/network)
*   **Playwright Browser Context Config**: [Playwright - Test Configuration Docs](https://playwright.dev/docs/test-configuration)
*   **Chrome Autoplay Settings**: [Google Chrome - Autoplay Policy Guide](https://developer.chrome.com/blog/autoplay/)
*   **MDN Service Worker API**: [Mozilla Web Docs - Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
*   **MDN Web Autoplay Policy**: [Mozilla Web Docs - Autoplay Guide for Media and Web Audio API](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)
