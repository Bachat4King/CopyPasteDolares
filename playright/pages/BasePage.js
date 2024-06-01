import {chromium} from 'playwright';

export default class BasePage {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    async init() {
        this.browser = await chromium.launch({headless: false});
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async findElement(selector, options = {}) {
        if (selector.startsWith('//') || selector.startsWith('(')) {
            // Si el selector es un XPath, utiliza page.$x()
            const elements = await this.page.$x(selector, {timeout: options.timeout || 10000});
            if (elements.length > 0) {
                return elements[0];
            } else {
                throw new Error(`No se encontró ningún elemento utilizando el XPath: ${selector}`);
            }
        } else {
            // Si el selector no es un XPath, utiliza page.$()
            const element = await this.page.$(selector, {timeout: options.timeout || 10000});
            if (element) {
                return element;
            } else {
                throw new Error(`No se encontró ningún elemento utilizando el selector: ${selector}`);
            }
        }
    }

    async click(selector) {
        const element = await this.findElement(selector);
        await element.click();
    }

    async fill(selector, text) {
        const element = await this.findElement(selector);
        await element.fill(text);
    }

    async getText(selector) {
        const element = await this.findElement(selector);
        return await element.evaluate(e => e.innerText);
    }

    async close() {
        await this.browser.close();
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async screenshot(path) {
        await this.page.screenshot({path});
    }
}
