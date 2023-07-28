const puppeteer = require('puppeteer');

(async function lookerStudio() {

    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
    
    const credentials = {

        email: "email.example@gmail.com",
        password: "password"

    }

    await page.goto("https://accounts.google.com/")
    await page.type('[name=identifier]', credentials.email)
    page.keyboard.press('Enter')

    const navigationPromise = page.waitForNavigation()
    await page.waitForSelector('input[type="password"]', { visible: true })
    await page.type('input[type="password"]', credentials.password)
    page.keyboard.press('Enter')

    await page.waitForSelector('input[type="search"]')
    await page.goto('urlLookerStudioDashboard')
    await page.waitForSelector('#more-options-header-menu-button')
    
    setInterval(()=>{
        page.evaluate((btnSelector) => {
            document.querySelector(btnSelector).click();
        }, "#more-options-header-menu-button");
        page.evaluate((btnSelector) => {
            document.querySelector(btnSelector).click();
        }, 
            "#header-refresh-button"
        );
        
        console.log("Updating dashboard... " + new Date())
    }, 60000)

})();
