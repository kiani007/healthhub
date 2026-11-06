import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  timeout: 45_000,
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `node scripts/serve.mjs .`,
    url: `http://localhost:${PORT}/index.html`,
    reuseExistingServer: true,
    env: { PORT: String(PORT) },
  },
  projects: [
    { name: "phone-se-320", use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true } },
    { name: "iphone-390", use: { ...devices["iPhone 13"], browserName: "chromium" } },
    { name: "pixel-412", use: { ...devices["Pixel 7"] } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: "ipad-820", use: { ...devices["Desktop Chrome"], viewport: { width: 820, height: 1180 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
    { name: "laptop-1280", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "wide-1920", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
  ],
});
