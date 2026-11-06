// Screenshots of each section at phone, tablet and desktop sizes into ./screenshots/<size>/.
// Viewport shots, not full-page ones: full-page capture misplaces sticky elements.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const PORT = 4174;
const sizes = [
  ["phone-390", 390, 844],
  ["tablet-820", 820, 1180],
  ["desktop-1440", 1440, 900],
];
const sections = [".facts", ".audience", "#services", "#process", ".equipment", "#about", "#reviews", ".tips", "#area", "#request", "#faq", ".final"];

const server = spawn(process.execPath, ["scripts/serve.mjs", "."], { env: { ...process.env, PORT: String(PORT) }, stdio: "ignore" });
await new Promise((r) => setTimeout(r, 400));
const browser = await chromium.launch();
try {
  for (const [name, width, height] of sizes) {
    await mkdir(`screenshots/${name}`, { recursive: true });
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2, isMobile: width < 700, hasTouch: width < 1000 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => !document.documentElement.classList.contains("motion"), null, { timeout: 5000 });
    await page.screenshot({ path: `screenshots/${name}/00-hero.png` });
    let i = 1;
    for (const selector of sections) {
      await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "start", behavior: "instant" }), selector);
      await page.waitForTimeout(1600);
      const label = String(i++).padStart(2, "0") + "-" + selector.replace(/[^a-z]/gi, "");
      await page.screenshot({ path: `screenshots/${name}/${label}.png` });
    }
    console.log("saved", name);
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}
