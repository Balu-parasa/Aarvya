const { chromium } = require('playwright');
const fs = require('fs');

async function takeScreenshot(page, name) {
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  console.log(`Screenshot: screenshots/${name}.png`);
}

async function getDesignTokens(page) {
  return await page.evaluate(() => {
    const tokens = {};

    const bodyStyle = getComputedStyle(document.body);
    tokens.backgroundColor = bodyStyle.backgroundColor;
    tokens.fontFamily = bodyStyle.fontFamily;
    tokens.fontSize = bodyStyle.fontSize;
    tokens.color = bodyStyle.color;

    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], .card, .bg-white, .bg-gray-50, .bg-slate-50, .bg-zinc-50, .soft-card');
    if (cards.length > 0) {
      const cardStyle = getComputedStyle(cards[0]);
      tokens.cardBackgroundColor = cardStyle.backgroundColor;
      tokens.cardBorderRadius = cardStyle.borderRadius;
      tokens.cardBorderColor = cardStyle.borderColor;
      tokens.cardBoxShadow = cardStyle.boxShadow;
    }

    const buttons = document.querySelectorAll('button, .btn, [class*="btn"]');
    if (buttons.length > 0) {
      const btnStyle = getComputedStyle(buttons[0]);
      tokens.buttonBackgroundColor = btnStyle.backgroundColor;
      tokens.buttonColor = btnStyle.color;
      tokens.buttonBorderRadius = btnStyle.borderRadius;
      tokens.buttonBorderColor = btnStyle.borderColor;
    }

    const inputs = document.querySelectorAll('input, textarea, select');
    if (inputs.length > 0) {
      const inputStyle = getComputedStyle(inputs[0]);
      tokens.inputBackgroundColor = inputStyle.backgroundColor;
      tokens.inputBorderColor = inputStyle.borderColor;
      tokens.inputBorderRadius = inputStyle.borderRadius;
    }

    const allElements = document.querySelectorAll('*');
    const gradients = [];
    allElements.forEach(el => {
      const style = getComputedStyle(el);
      const bg = style.backgroundImage;
      if (bg && bg.includes('gradient')) {
        gradients.push({ element: el.tagName, class: el.className, gradient: bg });
      }
    });
    tokens.gradients = gradients.slice(0, 10);

    return tokens;
  });
}

async function getPageInfo(page) {
  return await page.evaluate(() => {
    const info = {};

    const navItems = Array.from(document.querySelectorAll('nav a, header a, [role="navigation"] a, .navbar a, .nav-link'));
    info.navItems = navItems.map(a => ({ text: a.textContent.trim(), href: a.href }));

    const sidebarItems = Array.from(document.querySelectorAll('aside a, [role="navigation"] aside a, .sidebar a, .side-nav a'));
    info.sidebarItems = sidebarItems.map(a => ({ text: a.textContent.trim(), href: a.href }));

    const buttons = Array.from(document.querySelectorAll('button, .btn, [class*="btn"]'));
    info.buttons = buttons.map(b => ({ text: b.textContent.trim(), class: b.className }));

    const cards = Array.from(document.querySelectorAll('[class*="card"], .card, [class*="Card"], .soft-card'));
    info.cards = cards.map(c => ({ text: c.textContent.trim().substring(0, 150), class: c.className }));

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    info.headings = headings.map(h => ({ text: h.textContent.trim(), tag: h.tagName }));

    const forms = Array.from(document.querySelectorAll('form'));
    info.forms = forms.map(f => {
      const inputs = Array.from(f.querySelectorAll('input, select, textarea'));
      return { action: f.action, inputs: inputs.map(i => ({ type: i.type, name: i.name, placeholder: i.placeholder, class: i.className })) };
    });

    const tables = Array.from(document.querySelectorAll('table'));
    info.tables = tables.length > 0 ? 'present' : 'none';

    const charts = Array.from(document.querySelectorAll('canvas, svg[class*="chart"], .chart, [class*="recharts"], [class*="chartjs"]'));
    info.charts = charts.map(c => ({ tag: c.tagName, class: c.className }));

    return info;
  });
}

async function explorePage(page, url, name, findings, key) {
  console.log(`\n=== ${name} (${url}) ===`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    await takeScreenshot(page, name.replace(/\s+/g, '_').toLowerCase());
    findings[key] = {
      url: url,
      tokens: await getDesignTokens(page),
      info: await getPageInfo(page)
    };
    console.log(`${name} tokens:`, JSON.stringify(findings[key].tokens, null, 2));
    return true;
  } catch (e) {
    console.log(`Error exploring ${name}:`, e.message);
    return false;
  }
}

async function main() {
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  const findings = {};

  // Login first with known credentials
  console.log('\n=== LOGIN WITH KNOWN CREDENTIALS ===');
  await page.goto('https://sahaaya.base44.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.fill('input[type="email"], input[name="email"]', 'baluparasa239@gmail.com');
  await page.fill('input[type="password"]', 'Balu@123');
  await page.click('button[type="submit"], button:has-text("Log in"), button:has-text("Login")');
  await page.waitForTimeout(3000);
  console.log('Logged in, URL:', page.url());

  // Explore main pages from navigation
  await explorePage(page, 'https://sahaaya.base44.app/', 'home_page', findings, 'home');

  // Explore counsellor page
  await explorePage(page, 'https://sahaaya.base44.app/counsellor', 'counsellor_page', findings, 'counsellor');

  // Explore onboarding page
  await explorePage(page, 'https://sahaaya.base44.app/onboarding', 'onboarding_page', findings, 'onboarding');

  // Try to find and click demo cards for different roles
  console.log('\n=== EXPLORING DEMO PORTALS ===');
  // Go back to home
  await page.goto('https://sahaaya.base44.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Find demo links/cards
  const demoLinks = await page.$$('a[href*="demo"], a[href*="victim"], a[href*="counsellor"], a[href*="rehab"], a[href*="legal"], a[href*="district"], a[href*="state"], .soft-card');
  console.log(`Found ${demoLinks.length} potential demo elements`);

  for (let i = 0; i < demoLinks.length; i++) {
    try {
      const el = demoLinks[i];
      const text = await el.textContent();
      const href = await el.getAttribute('href');
      const tag = await el.evaluate(e => e.tagName);
      console.log(`Element ${i}: ${tag} - "${text.substring(0, 50)}" - href: ${href}`);
      if (href && !href.startsWith('http') && !href.includes('login') && !href.includes('register')) {
        const name = `demo_${text.replace(/\s+/g, '_').toLowerCase().substring(0, 30)}`;
        await explorePage(page, href.startsWith('/') ? `https://sahaaya.base44.app${href}` : `https://sahaaya.base44.app/${href}`, name, findings, name);
      }
    } catch (e) {
      console.log('Error with element:', e.message);
    }
  }

  // Try common portal paths
  const portalPaths = [
    '/victim', '/victim/dashboard', '/victim/portal',
    '/counsellor/dashboard', '/counsellor/portal',
    '/rehabilitation', '/rehabilitation/dashboard',
    '/legal', '/legal/dashboard',
    '/district', '/district/dashboard',
    '/admin', '/admin/dashboard',
    '/state', '/state/dashboard',
    '/portal/victim', '/portal/counsellor', '/portal/admin'
  ];

  for (const path of portalPaths) {
    const url = `https://sahaaya.base44.app${path}`;
    const name = `portal_${path.replace(/\//g, '_')}`;
    await explorePage(page, url, name, findings, name);
  }

  fs.writeFileSync('sahaaya_detailed_exploration.json', JSON.stringify(findings, null, 2));
  console.log('\n=== ALL DETAILED FINDINGS SAVED ===');

  await browser.close();
}

main().catch(console.error);