import BasePage from "../BasePage.js";

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.url = 'https://login.internacional.cl/client-person';
    }

    async goTo() {
        await this.page.goto(this.url);
        await this.page.click('text=Cerrar');
    }

    async login(username, password) {
        await this.page.fill('input#stacked-rut', username);
        await this.page.fill('input#stacked-password', password);
        await this.page.click('button[name="login-button"]');
    }
}

export default LoginPage;
