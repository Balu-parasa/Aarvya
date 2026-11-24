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

    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], .card, .bg-white, .bg-gray-50, .bg-slate-50, .bg-zinc-50');
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

    const cards = Array.from(document.querySelectorAll('[class*="card"], .card, [class*="Card"]'));
    info.cards = cards.map(c => ({ text: c.textContent.trim().substring(0, 100), class: c.className }));

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

async function main() {
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  const allFindings = {
    landingPage: {},
    auth: { login: {}, register: {} },
    victim: { dashboard: {}, pages: {} },
    counsellor: { dashboard: {}, pages: {} },
    admin: { dashboard: {}, pages: {} },
    designTokens: {},
    components: {}
  };

  console.log('\n=== LANDING PAGE ===');
  await page.goto('https://sahaaya.base44.app/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  await takeScreenshot(page, '01_landing_page');
  allFindings.landingPage.tokens = await getDesignTokens(page);
  allFindings.landingPage.info = await getPageInfo(page);
  console.log('Landing page tokens:', JSON.stringify(allFindings.landingPage.tokens, null, 2));

  console.log('\n=== LOGIN PAGE ===');
  const loginLink = await page.$('a:has-text("Login"), a:has-text("Log in"), a:has-text("Sign in"), button:has-text("Login")');
  if (loginLink) {
    await loginLink.click();
    await page.waitForTimeout(1000);
  } else {
    await page.goto('https://sahaaya.base44.app/login', { waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(1000);

  await takeScreenshot(page, '02_login_page');
  allFindings.auth.login.tokens = await getDesignTokens(page);
  allFindings.auth.login.info = await getPageInfo(page);
  console.log('Login page tokens:', JSON.stringify(allFindings.auth.login.tokens, null, 2));

  console.log('\n=== REGISTER PAGE ===');
  const registerLink = await page.$('a:has-text("Register"), a:has-text("Sign up"), a:has-text("Signup"), a:has-text("Create account")');
  if (registerLink) {
    await registerLink.click();
    await page.waitForTimeout(1000);
  } else {
    await page.goto('https://sahaaya.base44.app/register', { waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(1000);

  await takeScreenshot(page, '03_register_page');
  allFindings.auth.register.tokens = await getDesignTokens(page);
  allFindings.auth.register.info = await getPageInfo(page);
  console.log('Register page tokens:', JSON.stringify(allFindings.auth.register.tokens, null, 2));

  console.log('\n=== LOGIN AS VICTIM ===');
  await page.goto('https://sahaaya.base44.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.fill('input[type="email"], input[name="email"]', 'victim@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"], button:has-text("Log in"), button:has-text("Login")');
  await page.waitForTimeout(3000);

  const victimUrl = page.url();
  console.log('Victim URL after login:', victimUrl);

  if (!victimUrl.includes('/login')) {
    await takeScreenshot(page, '04_victim_dashboard');
    allFindings.victim.dashboard.tokens = await getDesignTokens(page);
    allFindings.victim.dashboard.info = await getPageInfo(page);
    console.log('Victim dashboard tokens:', JSON.stringify(allFindings.victim.dashboard.tokens, null, 2));

    const victimNavLinks = await page.$$('aside a, nav a, .sidebar a, [role="navigation"] a');
    for (let i = 0; i < Math.min(victimNavLinks.length, 10); i++) {
      try {
        const link = victimNavLinks[i];
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.includes('logout')) {
          console.log(`Navigating to victim page: ${text} (${href})`);
          await link.click();
          await page.waitForTimeout(1500);
          await takeScreenshot(page, `04_victim_${text.replace(/\s+/g, '_').toLowerCase()}`);
          allFindings.victim.pages[text] = { url: page.url(), tokens: await getDesignTokens(page), info: await getPageInfo(page) };
        }
      } catch (e) {
        console.log('Error navigating:', e.message);
      }
    }
  } else {
    console.log('Victim login failed, trying other credentials...');
  }

  console.log('\n=== LOGIN AS COUNSELLOR ===');
  await page.goto('https://sahaaya.base44.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.fill('input[type="email"], input[name="email"]', 'counsellor@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"], button:has-text("Log in"), button:has-text("Login")');
  await page.waitForTimeout(3000);

  const counsellorUrl = page.url();
  console.log('Counsellor URL after login:', counsellorUrl);

  if (!counsellorUrl.includes('/login')) {
    await takeScreenshot(page, '05_counsellor_dashboard');
    allFindings.counsellor.dashboard.tokens = await getDesignTokens(page);
    allFindings.counsellor.dashboard.info = await getPageInfo(page);
    console.log('Counsellor dashboard tokens:', JSON.stringify(allFindings.counsellor.dashboard.tokens, null, 2));

    const counsellorNavLinks = await page.$$('aside a, nav a, .sidebar a, [role="navigation"] a');
    for (let i = 0; i < Math.min(counsellorNavLinks.length, 10); i++) {
      try {
        const link = counsellorNavLinks[i];
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.includes('logout')) {
          console.log(`Navigating to counsellor page: ${text} (${href})`);
          await link.click();
          await page.waitForTimeout(1500);
          await takeScreenshot(page, `05_counsellor_${text.replace(/\s+/g, '_').toLowerCase()}`);
          allFindings.counsellor.pages[text] = { url: page.url(), tokens: await getDesignTokens(page), info: await getPageInfo(page) };
        }
      } catch (e) {
        console.log('Error navigating:', e.message);
      }
    }
  } else {
    console.log('Counsellor login failed');
  }

  console.log('\n=== LOGIN AS ADMIN ===');
  await page.goto('https://sahaaya.base44.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.fill('input[type="email"], input[name="email"]', 'admin@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"], button:has-text("Log in"), button:has-text("Login")');
  await page.waitForTimeout(3000);

  const adminUrl = page.url();
  console.log('Admin URL after login:', adminUrl);

  if (!adminUrl.includes('/login')) {
    await takeScreenshot(page, '06_admin_dashboard');
    allFindings.admin.dashboard.tokens = await getDesignTokens(page);
    allFindings.admin.dashboard.info = await getPageInfo(page);
    console.log('Admin dashboard tokens:', JSON.stringify(allFindings.admin.dashboard.tokens, null, 2));

    const adminNavLinks = await page.$$('aside a, nav a, .sidebar a, [role="navigation"] a');
    for (let i = 0; i < Math.min(adminNavLinks.length, 10); i++) {
      try {
        const link = adminNavLinks[i];
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.includes('logout')) {
          console.log(`Navigating to admin page: ${text} (${href})`);
          await link.click();
          await page.waitForTimeout(1500);
          await takeScreenshot(page, `06_admin_${text.replace(/\s+/g, '_').toLowerCase()}`);
          allFindings.admin.pages[text] = { url: page.url(), tokens: await getDesignTokens(page), info: await getPageInfo(page) };
        }
      } catch (e) {
        console.log('Error navigating:', e.message);
      }
    }
  } else {
    console.log('Admin login failed');
  }

  console.log('\n=== TRYING KNOWN CREDENTIALS ===');
  await page.goto('https://sahaaya.base44.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.fill('input[type="email"], input[name="email"]', 'baluparasa239@gmail.com');
  await page.fill('input[type="password"]', 'Balu@123');
  await page.click('button[type="submit"], button:has-text("Log in"), button:has-text("Login")');
  await page.waitForTimeout(3000);

  const knownUrl = page.url();
  console.log('Known creds URL:', knownUrl);

  if (!knownUrl.includes('/login')) {
    await takeScreenshot(page, '07_known_creds_dashboard');
    allFindings.knownCreds = { tokens: await getDesignTokens(page), info: await getPageInfo(page) };

    const navLinks = await page.$$('aside a, nav a, .sidebar a, [role="navigation"] a');
    for (let i = 0; i < Math.min(navLinks.length, 15); i++) {
      try {
        const link = navLinks[i];
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.includes('logout')) {
          console.log(`Navigating to: ${text} (${href})`);
          await link.click();
          await page.waitForTimeout(1500);
          await takeScreenshot(page, `07_${text.replace(/\s+/g, '_').toLowerCase()}`);
        }
      } catch (e) {
        console.log('Error:', e.message);
      }
    }
  }

  fs.writeFileSync('sahaaya_exploration.json', JSON.stringify(allFindings, null, 2));
  console.log('\n=== ALL FINDINGS SAVED TO sahaaya_exploration.json ===');

  await browser.close();
}

main().catch(console.error);