const puppeteer = require('puppeteer');

(async function lookerStudio() {

    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
    
    await page.setViewport({
        width: 1000,
        height: 500
    })
    
    const credentials = {

        email: "matheus.vieira@cittatelecom.net.br",
        password: "favelinha23"

    }

    await page.goto("https://accounts.google.com/InteractiveLogin/identifier?continue=https%3A%2F%2Flookerstudio.google.com%2F%3Frequirelogin%3D1&followup=https%3A%2F%2Flookerstudio.google.com%2F%3Frequirelogin%3D1&ltmpl=datastudio&passive=1209600&ifkv=AeDOFXiCpjgiMXQEkRLYMOWF8D0OcOJXhAqhHIhGMtNPqiuhOeg0ukQnkwQpnAibtbO4AGTBrfT-uQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin")
    await page.type('[name=identifier]', credentials.email)
    page.keyboard.press('Enter')

    const navigationPromise = page.waitForNavigation()
    await page.waitForSelector('input[type="password"]', { visible: true })
    await page.type('input[type="password"]', credentials.password)
    page.keyboard.press('Enter')

    await page.waitForSelector('input[type="search"]')
    await page.goto('https://lookerstudio.google.com/reporting/1bdac17a-634d-494f-9baa-8f612c0ac36c/page/egCED')
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
        console.log("Atualizando o Looker... " + new Date())
    }, 60000)

})();
