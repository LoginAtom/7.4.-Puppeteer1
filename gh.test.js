const puppeteer = require('puppeteer');

let browser;


jest.setTimeout(30000);

beforeAll(async () => {
  browser = await puppeteer.launch({ 
    headless: false, 
    slowMo: 500
  });
});

afterAll(async () => {
  await browser.close();
});

describe("Github page tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    
    await page.setDefaultTimeout(20000);
    await page.setDefaultNavigationTimeout(20000);
    await page.goto("https://github.com/team", { 
      waitUntil: 'networkidle0', 
      timeout: 20000 
    });
  }, 25000); 

  afterEach(async () => {
    await page.close();
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1", { timeout: 10000 });
    const title = await page.title();
    expect(title).toContain("GitHub"); 
  }, 25000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 15000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true, timeout: 10000 });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started");
  }, 15000);
});

describe("Added tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultTimeout(15000);
    await page.setDefaultNavigationTimeout(15000);
  }, 20000);

  afterEach(async () => {
    await page.close();
  });

  test("The h1 content home", async () => {
    await page.goto("https://github.com/home", { timeout: 15000 });
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 20000);

  test("The h1 content EPAM", async () => {
    await page.goto("https://github.com/epam", { timeout: 15000 });
    const title = await page.title();
    expect(title).toContain("EPAM");
  }, 15000);

  test("Blog", async () => {
    await page.goto("https://github.blog", { timeout: 15000 });
    const title = await page.title();
    expect(title).toContain("GitHub Blog");
  }, 15000);
});

describe("New pages tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultTimeout(20000);
    await page.setDefaultNavigationTimeout(20000);
  }, 25000);

  afterEach(async () => {
    await page.close();
  });

  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing", { timeout: 20000 });
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 25000);

  test("Explore page title", async () => {
    await page.goto("https://github.com/explore", { timeout: 20000 });
    const title = await page.title();
    expect(title).toContain("Explore");
  }, 25000);

  test("Marketplace page title", async () => {
    await page.goto("https://github.com/marketplace", { timeout: 20000 });
    const title = await page.title();
    expect(title).toContain("Marketplace");
  }, 25000);
});