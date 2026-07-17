const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1, // Use 1 worker to ensure stable sequential runs on local systems
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    serviceWorkers: 'block', // Block Service Workers by default to prevent cache contamination
    launchOptions: {
      args: ['--autoplay-policy=no-user-gesture-required'] // Bypass autoplay policy
    }
  },
  // Automatically start http-server serving the static dist folder
  webServer: {
    command: 'npx http-server dist -p 3000 -c-1', // -c-1 disables browser/CDN caching
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 10 * 1000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
