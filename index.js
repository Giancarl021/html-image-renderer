const parseOptions = require('./src/services/options');
const createBrowser = require('./src/services/browser');

module.exports = function () {
    const browser = createBrowser();
    let iface = () => {};

    function setInterface(fn) {
        iface = fn;
    }

    async function render(pathToHtml, options) {
        try {
            const { width, height, dest, params } = parseOptions(options);
            await browser.start();
            await browser.goTo(pathToHtml);
            await browser.eval(iface, params);
            const result = await browser.screenshot(width, height, dest);
            await browser.close();

            return result;
        } catch (err) {
            await browser.close();
            throw err;
        }
    }

    return {
        setInterface,
        render
    };
}