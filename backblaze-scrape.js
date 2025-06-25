const puppeteer = require('puppeteer');

// Credentials
const email = 'your-email@mail.com';
const password = 'your-password';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://secure.backblaze.com/user_signin.htm', { waitUntil: 'networkidle2' });

  // Step 1: Enter email and submit
  await page.waitForSelector('#email-field');
  await page.type('input[name="email-field"]', email);
  await page.click('button[type="submit"]');

  // Step 2: Wait for password field to appear, then enter password
  await page.waitForSelector('input[name="password-field"]');
  await page.type('input[name="password-field"]', password);
  await page.click('button[type="submit"]');

  // Step 3: Wait for login redirect
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Step 4: Navigate to the buckets page
  await page.goto('https://secure.backblaze.com/b2_buckets.htm', { waitUntil: 'networkidle2' });

  await page.waitForSelector('.b2-overview');

  const buckets = await page.evaluate(() => {
    const bucketDivs = Array.from(document.querySelectorAll('.b2-overview'));
    return bucketDivs.map(overview => {
      const bucket = {};
      const name = overview.querySelector('.b2-bucket-bucket-name');
      if (name) bucket['Bucket Name'] = name.textContent.trim();

      const labels = overview.querySelectorAll('.b2-stats-label');
      const values = overview.querySelectorAll('.b2-stats-data');
      labels.forEach((label, i) => {
        const key = label.textContent.trim().replace(':', '');
        const val = values[i]?.textContent.trim();
        if (key && val) bucket[key] = val;
      });

      return bucket;
    });
  });

  console.log(JSON.stringify(buckets, null, 2));

  await browser.close();
})();
