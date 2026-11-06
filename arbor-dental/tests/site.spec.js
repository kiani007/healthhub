import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const URL = "/index.html";
const NAV_COLLAPSE = 1240;
const ACTION_BAR = 767;

const width = (page) => page.viewportSize().width;

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.round(window.innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
  });
}

async function heroSettled(page) {
  await page.waitForFunction(() => !document.documentElement.classList.contains("motion"), null, { timeout: 5000 });
}

async function scrollToSection(page, selector) {
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ behavior: "instant", block: "start" }), selector);
  await page.waitForTimeout(150);
}

test.describe("Arbor Dental site", () => {
  test("loads with no errors, no broken assets and no sideways scroll", async ({ page }) => {
    const problems = [];
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
    page.on("requestfailed", (r) => problems.push(`failed: ${r.url()}`));
    page.on("response", (r) => r.status() >= 400 && problems.push(`${r.status()}: ${r.url()}`));

    await page.goto(URL);
    await heroSettled(page);
    await scrollThrough(page);
    await page.waitForLoadState("networkidle");

    const layout = await page.evaluate(() => ({ inner: window.innerWidth, scroll: document.documentElement.scrollWidth }));
    expect(layout.inner, "mobile browser had to zoom out to fit the layout").toBe(width(page));
    expect(layout.scroll, "page is wider than the viewport").toBeLessThanOrEqual(width(page));

    const broken = await page.evaluate(async () => {
      const bad = [];
      for (const img of document.images) {
        img.scrollIntoView({ block: "center" });
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((done) => {
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
            setTimeout(done, 5000);
          });
        }
        if (!img.complete || img.naturalWidth === 0) bad.push(img.currentSrc || img.src);
      }
      return bad;
    });
    expect(broken).toEqual([]);

    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return { serif: document.fonts.check('400 48px "Newsreader"'), sans: document.fonts.check('400 18px "Plus Jakarta Sans"') };
    });
    expect(fonts).toEqual({ serif: true, sans: true });

    const clippedButtons = await page.$$eval(".btn", (btns) =>
      btns.filter((b) => b.offsetParent && b.scrollWidth > b.clientWidth + 1).map((b) => b.textContent.trim())
    );
    expect(clippedButtons, "button text spills out of its button").toEqual([]);

    expect(problems).toEqual([]);
  });

  test("hero entrance animation runs and ends fully visible", async ({ page }) => {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    const running = await page.waitForFunction(
      () => document.getAnimations().filter((a) => a.playState === "running").length > 0,
      null,
      { timeout: 3000 }
    );
    expect(await running.jsonValue()).toBe(true);

    await heroSettled(page);
    await page.waitForFunction(() => document.getAnimations().filter((a) => a.playState === "running").length === 0, null, { timeout: 4000 });

    const state = await page.evaluate(() => ({
      words: [...document.querySelectorAll("#hero-title .w")].map((w) => getComputedStyle(w).opacity),
      supporting: [...document.querySelectorAll("[data-hero]")].map((el) => getComputedStyle(el).opacity),
      clip: getComputedStyle(document.querySelector("[data-hero-media]")).clipPath,
      title: document.querySelector("#hero-title").textContent,
    }));
    expect(state.words.length).toBeGreaterThan(5);
    expect(new Set(state.words)).toEqual(new Set(["1"]));
    expect(new Set(state.supporting)).toEqual(new Set(["1"]));
    expect(state.clip).toBe("none");
    expect(state.title).toBe("Dental care that comes to your residents.");
  });

  test("photographs reveal as they scroll into view", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    const figure = page.locator(".about-photo");
    const before = await figure.evaluate((el) => getComputedStyle(el).clipPath);
    expect(before).toContain("inset");
    await figure.scrollIntoViewIfNeeded();
    await expect.poll(() => figure.evaluate((el) => getComputedStyle(el).clipPath), { timeout: 4000 }).toBe("none");
  });

  test("reduced motion shows everything at once", async ({ browser }, info) => {
    const context = await browser.newContext({ ...info.project.use, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(URL);
    expect(await page.evaluate(() => document.documentElement.classList.contains("motion"))).toBe(false);
    await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
    await expect(page.locator(".hero-ctas")).toHaveCSS("opacity", "1");
    const clip = await page.locator(".about-photo").evaluate((el) => getComputedStyle(el).clipPath);
    expect(clip).toBe("none");
    await context.close();
  });

  test("content is readable with JavaScript turned off", async ({ browser }, info) => {
    const context = await browser.newContext({ ...info.project.use, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(URL);
    await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
    await expect(page.locator(".hero-media")).toHaveCSS("clip-path", "none");
    for (const id of ["#facilities", "#services", "#process", "#about", "#area", "#request", "#faq"]) {
      await expect(page.locator(id)).toBeAttached();
    }
    await context.close();
  });

  test("primary navigation works at this width", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    const menu = page.locator("#menuBtn");
    const nav = page.locator("#primary-nav");
    if (width(page) <= NAV_COLLAPSE) {
      await expect(menu).toBeVisible();
      await expect(nav).toBeHidden();
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await expect(nav).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(nav).toBeHidden();
      await expect(menu).toBeFocused();
      await menu.click();
      await nav.getByRole("link", { name: "Services" }).click();
      await expect(nav).toBeHidden();
    } else {
      await expect(menu).toBeHidden();
      await expect(nav).toBeVisible();
      await nav.getByRole("link", { name: "Services" }).click();
    }
    await expect.poll(() => page.evaluate(() => Math.round(document.querySelector("#services").getBoundingClientRect().top)), { timeout: 4000 })
      .toBeLessThan(140);
    await expect(page.locator(".nav a[href='#services']")).toHaveAttribute("aria-current", "true");
  });

  test("facility form validates, confirms and resets", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    await scrollToSection(page, "#request");
    const form = page.locator("#form-facility");
    await form.getByRole("button", { name: "Request a consult" }).click();
    await expect(form.locator(".field.invalid")).toHaveCount(6);
    await expect(page.locator("#f-name")).toBeFocused();
    await expect(page.locator("#f-name")).toHaveAttribute("aria-invalid", "true");

    await page.fill("#f-name", "Jordan Lee");
    await expect(form.locator(".field.invalid")).toHaveCount(5);
    await page.selectOption("#f-role", "Director of Nursing");
    await page.fill("#f-facility", "Lakeview Manor");
    await page.fill("#f-town", "Laconia");
    await page.fill("#f-phone", "603 555 0100");
    await page.fill("#f-email", "not-an-email");
    await form.getByRole("button", { name: "Request a consult" }).click();
    await expect(form.locator(".field.invalid")).toHaveCount(1);
    await expect(page.locator("#f-email")).toBeFocused();
    await page.fill("#f-email", "jordan@example.org");
    await form.getByRole("button", { name: "Request a consult" }).click();

    await expect(page.locator("#success")).toBeVisible();
    await expect(page.locator("#successText")).toContainText("Dr. Kris will call within one business day");
    await expect(page.locator("#successTitle")).toBeFocused();
    await expect(form).toBeHidden();

    await page.getByRole("button", { name: "Send another request" }).click();
    await expect(form).toBeVisible();
    await expect(page.locator("#f-name")).toHaveValue("");
    await expect(page.locator("#tab-facility")).toBeFocused();
  });

  test("audience tabs follow links and the keyboard", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    await page.getByRole("link", { name: "Request a visit for a loved one" }).click();
    await expect(page.locator("#tab-family")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#form-family")).toBeVisible();
    await expect(page.locator("#form-facility")).toBeHidden();
    await expect.poll(() => page.locator(".tab-ind").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41), { timeout: 3000 })
      .toBeGreaterThan(50);

    await page.locator("#tab-family").focus();
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator("#tab-facility")).toBeFocused();
    await expect(page.locator("#tab-facility")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#form-facility")).toBeVisible();
    await page.keyboard.press("End");
    await expect(page.locator("#tab-family")).toHaveAttribute("aria-selected", "true");
  });

  test("FAQ answers open and close smoothly", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    await scrollToSection(page, "#faq");
    const item = page.locator(".faq details").first();
    const answer = item.locator(".ans");
    await item.locator("summary").click();
    await expect(item).toHaveJSProperty("open", true);
    await expect(item).toHaveClass(/is-open/);
    await expect.poll(() => answer.evaluate((el) => el.getBoundingClientRect().height), { timeout: 3000 }).toBeGreaterThan(60);
    await page.waitForTimeout(600);
    expect(await answer.evaluate((el) => el.style.height)).toBe("");

    await item.locator("summary").click();
    await expect(item).toHaveJSProperty("open", false, { timeout: 3000 });
    await expect(item).not.toHaveClass(/is-open/);
  });

  test("process timeline fills as the reader scrolls", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    const fillScale = () => page.locator(".rail-fill").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).d);

    await scrollToSection(page, "#process");
    await page.evaluate(() => window.scrollBy(0, -window.innerHeight));
    await page.waitForTimeout(200);
    expect(await page.locator(".step.is-active").count()).toBe(0);

    await page.evaluate(() => {
      const wrap = document.querySelector(".steps-wrap");
      const mid = wrap.getBoundingClientRect().top + window.scrollY + wrap.offsetHeight / 2;
      window.scrollTo(0, mid - window.innerHeight * 0.62);
    });
    await expect.poll(fillScale, { timeout: 3000 }).toBeGreaterThan(0.3);
    const midCount = await page.locator(".step.is-active").count();
    expect(midCount).toBeGreaterThan(1);
    expect(midCount).toBeLessThan(8);

    await page.evaluate(() => {
      const wrap = document.querySelector(".steps-wrap");
      window.scrollTo(0, wrap.getBoundingClientRect().bottom + window.scrollY);
    });
    await expect.poll(() => page.locator(".step.is-active").count(), { timeout: 3000 }).toBe(8);
    await expect.poll(fillScale, { timeout: 3000 }).toBeGreaterThan(0.99);
  });

  test("phone action bar stays out of the way", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    const bar = page.locator("#stickyBar");
    if (width(page) > ACTION_BAR) {
      await expect(bar).toBeHidden();
      return;
    }
    await expect(bar).toHaveClass(/is-hidden/);
    await scrollToSection(page, "#services");
    await expect(bar).not.toHaveClass(/is-hidden/);
    await expect(bar.getByRole("link", { name: "Call now" })).toHaveAttribute("href", "tel:+16037071230");
    await scrollToSection(page, "#request");
    await expect(bar).toHaveClass(/is-hidden/);
  });

  test("touch targets are at least 44px", async ({ page }, info) => {
    test.skip(!info.project.use.hasTouch, "touch-only check");
    await page.goto(URL);
    await heroSettled(page);
    await scrollThrough(page);
    const small = await page.$$eval(
      ".btn, .menu-btn, .phone-link, .tab, .faq summary, .field input, .field select, .nav a",
      (els) =>
        els
          .filter((el) => el.offsetParent !== null)
          .map((el) => ({ el, r: el.getBoundingClientRect() }))
          .filter(({ r }) => r.width > 0 && (r.height < 44 || r.width < 44))
          .map(({ el, r }) => `${el.className || el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`)
    );
    expect(small).toEqual([]);
  });

  test("passes automated accessibility checks (WCAG 2.1 AA)", async ({ page }) => {
    await page.goto(URL);
    await heroSettled(page);
    await scrollThrough(page);
    await page.waitForTimeout(1600);
    await page.evaluate(() => window.scrollTo(0, 0));
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 4).join(", ")}`);
    expect(summary).toEqual([]);
  });
});
