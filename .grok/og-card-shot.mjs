import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const html = readFileSync("/workspace/.grok/og-card.html", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.setContent(html, {
  waitUntil: "load",
  baseURL: "file:///workspace/.grok/",
});
await page.evaluate(async () => {
  await document.fonts.ready;
});
await page.waitForTimeout(400);
await page.screenshot({
  path: "/workspace/.grok/og-card-raw.png",
  type: "png",
  omitBackground: false,
});
await browser.close();
console.log("shot ok");
