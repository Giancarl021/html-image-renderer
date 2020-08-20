const parseOptions = require('./src/services/options');
const createBrowser = require('./src/services/browser');

module.exports = function (pathToHtml = null) {
    const browser = createBrowser();
    let iface = () => {};

    function setInterface(fn) {
        iface = fn;
    }

    async function _render(pathToHtml, options) {
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

    const render = pathToHtml ? _render.bind(null, pathToHtml) : _render;

    return {
        setInterface,
        render
    };
}