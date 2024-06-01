import {chromium} from 'playwright';
import LoginPage from "./pages/internacional/LoginPage.js";
import TefPage from "./pages/internacional/TefPage.js";

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext({
        viewport: null, // Permite que la ventana se maximice
    });

    // Crea una nueva página en el contexto
    const page = await context.newPage();

    // Crea una instancia de LoginPage con la página creada
    const internacional = new LoginPage(page);

    // Llama al método goTo() antes de login, si es necesario
    await internacional.goTo();

    // Realiza el inicio de sesión
    await internacional.login('20713218-7', 'Miaumiau00');

    const data = {
        "bank": "BANCO FALABELLA",
        "rut": "20713218-7",
        "account_number": "15680061866",
        "account_type": "CUENTA CORRIENTE",
        "email": "bastian.lpm0@gmail.com",
        "name": "Bastian Silva"
    }

    const amount = "12000"

    const tefpage = new TefPage(page);
    await tefpage.clickMenuOption('Transferencias');

    await tefpage.makeTransfer(data, amount);

})();
