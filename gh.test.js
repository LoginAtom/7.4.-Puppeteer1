const puppeteer = require('puppeteer');

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch({ 
    headless: false, 
    slowMo: 200 
  });
});

afterAll(async () => {
  await browser.close();
});


describe("Github page tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(async () => {
    await page.close();
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("GitHub"); 
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started");
  }, 10000);
});

describe("Added tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test("The h1 content home", async () => {
    await page.goto("https://github.com/home");
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 10000);

  test("The h1 content EPAM", async () => {
    await page.goto("https://github.com/epam");
    const title = await page.title();
    expect(title).toContain("EPAM");
  }, 10000);

  test("Blog", async () => {
    await page.goto("https://github.blog");
    const title = await page.title();
    expect(title).toContain("GitHub Blog");
  }, 10000);
});

//(Задача 2)
describe("New pages tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 15000);

  test("Explore page title", async () => {
    await page.goto("https://github.com/explore");
    const title = await page.title();
    expect(title).toContain("Explore");
  }, 15000);

  test("Marketplace page title", async () => {
    await page.goto("https://github.com/marketplace");
    const title = await page.title();
    expect(title).toContain("GitHub Marketplace");
  }, 15000);
});