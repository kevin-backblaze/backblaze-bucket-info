# Backblaze B2 Bucket Scraper

A Node.js script that logs into the Backblaze B2 Web UI, navigates to the buckets overview page, and extracts detailed metadata for each bucket. Outputs the results in JSON format.

## Description

This script automates login to the Backblaze B2 web portal using Puppeteer, simulates the browser workflow (including handling dynamic login forms), and scrapes data such as:

- Bucket Name  
- Creation Date  
- Bucket ID  
- Type (Public/Private)  
- File Lifecycle  
- Snapshot Count  
- Current File Count  
- Total Storage Size  
- Endpoint URL  
- Encryption Status  

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Chrome or Chromium (automatically managed by Puppeteer unless using `puppeteer-core`)

### Installation

```bash
git clone https://github.com/yourusername/backblaze-bucket-scraper.git
cd backblaze-bucket-scraper
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
B2_EMAIL=your-email@example.com
B2_PASSWORD=your-backblaze-password
```

> ⚠️ 2FA is not yet supported. Use an account without TOTP/SMS for testing.

### Executing the Script

```bash
node backblaze-scrape.js
```

By default, the browser window will open visibly. You can switch to headless mode by editing the `puppeteer.launch()` options in the script:

```js
headless: true
```

### Output

The script will print a JSON object to the console with all extracted bucket details.

## Help

- Make sure your credentials are valid and 2FA is disabled for the test account.
- If elements are not found, ensure the Backblaze UI hasn’t changed structurally.
- For debugging, set `headless: false` in the script to watch the browser interact with the page.

## Authors

- Kevin Lott

## Version History

- 0.1  
  - Initial release with login, navigation, and bucket metadata scraping.

## License

This project is licensed under the MIT License.
