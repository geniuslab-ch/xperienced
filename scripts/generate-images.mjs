// Génère public/og.png (1200×630) et public/apple-touch-icon.png à partir des pages du site.
// Usage : lancer le site (npm run dev ou npm start), puis : npm run images
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL || 'http://localhost:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`${base}/og`, { waitUntil: 'networkidle' });
await page.locator('.og').screenshot({ path: 'public/og.png' });

const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(`<body style="margin:0;background:#f5efe3"><img src="${base}/favicon.svg" style="width:180px;height:180px"></body>`);
await icon.waitForTimeout(200);
await icon.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('Images générées dans public/.');
