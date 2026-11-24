const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('https://sahaaya.base44.app/', { waitUntil: 'networkidle', timeout: 60000 });
  console.log('URL:', page.url());
  console.log('TITLE:', await page.title());
  const emailField = await page.$('input[type="email"], input[name="email"], input[placeholder*="mail" i]');
  console.log('email field found:', !!emailField);
  if (emailField) {
    await emailField.fill('baluparasa239@gmail.com');
    const pwField = await page.$('input[type="password"]');
    if (pwField) await pwField.fill('Balu@123');
    const submit = await page.$('button[type="submit"], button:has-text("Log in"), button:has-text("Login"), button:has-text("Sign in"), button:has-text("Sign In")');
    console.log('submit:', submit ? await submit.textContent() : 'none');
    if (submit) await submit.click();
    await page.waitForTimeout(5000);
    console.log('AFTER URL:', page.url());
  }
  await page.screenshot({ path: 'dashboard.png', fullPage: true });
  console.log('screenshot saved');
  await browser.close();
})();
