const puppeteer = require("puppeteer");

async function scrapeData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const [el] = await page.$x('//*[@id="landingImage"]');
  const src = await el.getProperty("src");
  const imgurl = await src.jsonValue();
  //
  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty("textContent");
  const title = await txt.jsonValue();

  const [el3] = await page.$x(
    "/html/body/div[2]/div[1]/div[4]/div[4]/div[1]/div[3]/div/form/div[1]/div/div/div/div[1]/h5/div/div[2]/div/span[2]"
  );
  const txt2 = await el3.getProperty("textContent");
  const price = await txt2.jsonValue();
  console.log({ imgurl, title, price });
  browser.close();
}

scrapeData(
  "https://www.amazon.com/Jumanji-Level-Blu-ray-Dwayne-Johnson/dp/B07ZWBH99Z?pf_rd_p=8512c031-20a6-5464-9f80-bd5545c33791&pf_rd_r=6K161Y4WYD4STD943TX2&pd_rd_wg=Voq2p&ref_=pd_gw_ri&pd_rd_w=r7jSV&pd_rd_r=24e04e4f-c1d3-4e5e-b82d-f2b1f7880a5f"
);
