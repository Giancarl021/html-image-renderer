const puppeteer = require('puppeteer');
const locate = require('../util/locate');

module.exports = function () {
    let browser, page;

    async function start(options = {}) {
        if (browser) return;
        browser = await puppeteer.launch(options);
    }

    async function close() {
        if (page) await page.close();
        if (browser) await browser.close();
        page = browser = null;
    }

    async function goTo(url) {
        page = await browser.newPage();
        await page.goto(url);
    }

    async function exec(functionName, ...args) {
        await eval((fn, ...args) => {
            window[fn](...args);
        }, functionName, ...args);
    }

    async function eval(fn, ...args) {
        await page.evaluate(fn, ...args);
    }

    async function screenshot(width = null, height = null, dest = null) {
        if (width && height) {
            await page.setViewport({
                width,
                height
            });
        } else if (width) {
            await page.setViewport({
                width,
                height: width
            });
        }

        if (!dest) return await page.screenshot();

        await page.screenshot({
            path: locate(String(dest))
        });
    }

    return {
        start,
        goTo,
        exec,
        eval,
        screenshot,
        close
    }
}