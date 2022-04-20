const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://m.facebook.com");
  await page.waitForSelector("#login_form");
  await page.type("#m_login_email", "panicuq.lujoqa@labworld.org");
  await page.type("#m_login_password", "Puppeteer123");
  await page.click("#login_form button");
  await page.waitForNavigation();
  await page.click("a");
  await page.waitForNavigation();
  const elements = await page.$$("div._50xr");
  await page.waitForSelector("i.img");

  for (let i = 0; i < elements.length; i++) {
    try {
      await elements[i].screenshot({ path: `${i}.png` });
      await page.waitForTimeout(1500);
      await scrollPageToBottom(page, { size: 500 });
    } catch (e) {
      console.log(
        `couldnt take screenshot of element with index: ${i}. cause: `,
        e
      );
    }
  }

  //   await browser.close();
})();
