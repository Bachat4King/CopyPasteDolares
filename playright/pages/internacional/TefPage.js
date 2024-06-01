import BasePage from "../BasePage.js";


class TefPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.banks = {
            'BANCO DE CHILE': 'BANCO DE CHILE/EDWARDS CITI',
            'BANCODECHILE': 'BANCO DE CHILE/EDWARDS CITI',
            'BANCO FALABELLA': 'BANCO FALABELLA',
            'BANCOFALABELLA': 'BANCO FALABELLA',
            'BANCO SANTANDER': 'BANCO SANTANDER',
            'BANCOSANTANDER': 'BANCO SANTANDER',
            'BANCO ESTADO': 'BANCO ESTADO',
            'BANCOESTADO': 'BANCO ESTADO',
            'BANCO BCI': 'BANCO BCI/MACH',
            'BANCOBCI': 'BANCO BCI/MACH',
            'BCI': 'BANCO BCI/MACH',
            'BCI MACH': 'BANCO BCI/MACH',
            'BCIMACH': 'BANCO BCI/MACH',
            'BCI/MACH': 'BANCO BCI/MACH',
            'MACH': 'BANCO BCI/MACH',
            'MACH BCI': 'BANCO BCI/MACH',
            'MACHBCI': 'BANCO BCI/MACH',
            'MACH/BCI': 'BANCO BCI/MACH',
            'MERCADO PAGO': 'MERCADO PAGO',
            'MERCADOPAGO': 'MERCADO PAGO',
            'BANCO RIPLEY': 'BANCO RIPLEY',
            'BANCORIPLEY': 'BANCO RIPLEY',
            'RIPLEY': 'BANCO RIPLEY',
            'SCOTIABANK': 'SCOTIABANK CHILE',
            'BANCO SCOTIABANK': 'SCOTIABANK CHILE',
            'BANCOSCOTIABANK': 'SCOTIABANK CHILE',
            'BANCO ITAÚ': 'BANCO ITAU',
            'BANCOITAÚ': 'BANCO ITAU',
            'BANCO ITAU': 'BANCO ITAU',
            'BANCOITAU': 'BANCO ITAU',
            'ITAU': 'BANCO ITAU',
            'ITAÚ': 'BANCO ITAU',
            'TAPP': 'TAPP CAJA LOS ANDES',
            'TAPP CAJA LOS ANDES': 'TAPP CAJA LOS ANDES',
            'TAPPCAJALOSANDES': 'TAPP CAJA LOS ANDES',
            'CAJA LOS ANDES': 'TAPP CAJA LOS ANDES',
            'CAJALOSANDES': 'TAPP CAJA LOS ANDES',
            'TAPP LOS ANDES': 'TAPP CAJA LOS ANDES',
            'TAPPLOSANDES': 'TAPP CAJA LOS ANDES',
            'TAPO CAJA LOS ANDES': 'TAPP CAJA LOS ANDES',
            'TAPOCAJALOSANDES': 'TAPP CAJA LOS ANDES',
            'TENPO': 'TENPO PREPAGO',
            'TENPO PREPAGO': 'TENPO PREPAGO',
            'TENPOPREPAGO': 'TENPO PREPAGO',
            'TEMPO': 'TENPO PREPAGO',
            'TEMPO PREPAGO': 'TENPO PREPAGO',
            'TEMPOPREPAGO': 'TENPO PREPAGO',
            'COOPEUCH': 'COOPEUCH / DALE',
            'DALE': 'COOPEUCH / DALE',
            'COOPEUCH / DALE': 'COOPEUCH / DALE',
            'COOPEUCHDALE': 'COOPEUCH / DALE',
            'DALECOOPEUCH': 'COOPEUCH / DALE',
            'COOPEUCH/DALE': 'COOPEUCH / DALE',
            'BANCO BICE': 'BANCO BICE',
            'BANCOBICE': 'BANCO BICE',
            'BICE': 'BANCO BICE',
            'BANCO SECURITY': 'BANCO SECURITY',
            'BANCOSECURITY': 'BANCO SECURITY',
            'SECURITY': 'BANCO SECURITY',
        }

        this.account_type = {
            'CUENTA CORRIENTE': 'CUENTA CORRIENTE',
            'CUENTACORRIENTE': 'CUENTA CORRIENTE',
            'CUENTA DE CORRIENTE': 'CUENTA CORRIENTE',
            'CUENTADECORRIENTE': 'CUENTA CORRIENTE',
            'CUENTA VISTA': 'CUENTA VISTA',
            'CUENTAVISTA': 'CUENTA VISTA',
            'VCUENTA VISTA': 'CUENTA VISTA',
            'VCUENTAVISTA': 'CUENTA VISTA',
            'CUENTA DE VISTA': 'CUENTA VISTA',
            'CUENTADEVISTA': 'CUENTA VISTA',
            'CUENTA PRIMA': 'CUENTA VISTA',
            'CUENTAPRIMA': 'CUENTA VISTA',
            'CUENTA DE PRIMA': 'CUENTA VISTA',
            'CUENTADEPRIMA': 'CUENTA VISTA',
            'CUENTA RUT': 'CUENTA VISTA',
            'CUENTARUT': 'CUENTA VISTA',
            'CUENTA AHORRO': 'CUENTA AHORRO',
            'CUENTA DE AHORRO': 'CUENTA AHORRO',
            'CUENTADEAHORRO': 'CUENTA AHORRO',
            'CUENTAAHORRO': 'CUENTA AHORRO',
            'CORRIENTE': 'CUENTA CORRIENTE',
            'VISTA': 'CUENTA VISTA',
            'VISA': 'CUENTA VISTA',
            'RUT': 'CUENTA VISTA',
            'AHORRO': 'CUENTA AHORRO',
            'DEBITO': 'CUENTA CORRIENTE',
            'DEBIT': 'CUENTA CORRIENTE',
            'CREDITO': 'CUENTA CORRIENTE',
            'CREDIT': 'CUENTA CORRIENTE',
            'DÉBITO': 'CUENTA CORRIENTE',
            'DÉBIT': 'CUENTA CORRIENTE',
            'CRÉDITO': 'CUENTA CORRIENTE',
            'CRÉDIT': 'CUENTA CORRIENTE',
        }
    }

    async _mapBank(bank) {
        return this.banks[bank] || '';
    }

    async _mapAccountType(accountType) {
        return this.account_type[accountType] || '';
    }

    async _searchReceiver(accountNumber) {
        await this.page.fill('input[placeholder="Buscar"]', accountNumber);
    }

    async selectReceiver(accountNumber) {
        await this._searchReceiver(accountNumber);

        if (await this._validateReceiverAccount(accountNumber)) {
            await this.page.click('div.rdt_TableBody > div > div > input');
        } else {
            throw new Error("Receiver account not found");
        }
    }

    async _validateReceiverAccount(accountNumber) {
        const receiverAccount = await this.getText('//div[contains(@class, \'rdt_TableBody\')]/div/div[@data-column-id=\'5\']');

        if (receiverAccount.includes(accountNumber)) {
            return true;
        } else {
            throw new Error(`Expected receiver account to be ${accountNumber} but got ${receiverAccount}`);
        }
    }

    async makeTransferReceiverAlreadyAdded(data, amount) {
        await this.page.$('div.rdt_TableBody');

        await this.selectReceiver(data.account_type);

        await this.fill('div.currency-input > input', amount);
        await this.fill('#reason', 'tef');

        if (await this._confirmTransfer()) {
            await this.waitToTransfer();
        }
    }

    async _confirmTransfer() {
        await this.page.click('button:has-text("Continuar")');

        try {
            await this.page.findElement('p[data-testid="error-message-paragraph"]', {timeout: 3000});
            await this.clickMenuOption('Transferencias');
            console.log('Transfer not completed, 24h limit reached');
            return false;
        } catch (error) {
            // Continue with transfer confirmation
        }

        await this.page.click('button:has-text("Confirmar")');
        await this.page.click('div[data-testid="interpass-container"]');
        return true;
    }

    async validateReceiverExists() {
        try {
            await this.page.findElement('//div[@class=\'existing-recipient-container\']', {timeout: 10000});
            await this.page.click('//button[@class=\'existing-recipient-button\']');
            return true;
        } catch (error) {
            return false;
        }
    }

    async makeTransfer(data, amount) {
        await this.page.click('button.new-recipient-button');

        await this.page.click('//p[text()=\'Banco *\']/parent::div/button');
        const bank = await this._mapBank(data.bank);
        await this.page.click(`//div[@data-testid='generic-dropdown-list']/button/p[text()='${bank}']`);

        await this.page.fill('#account-number', data.account_number);

        await this.page.click('//div[@class=\'header-bottom\']');

        const receiverExists = await this.validateReceiverExists()
        console.log(receiverExists);


        if (receiverExists) {
            await this.makeTransferReceiverAlreadyAdded(data, amount);
        } else {
            await this.page.click('//p[text()=\'Tipo de cuenta *\']/parent::div/button');
            const accountType = await this._mapAccountType(data.account_type);
            await this.page.click(`//div[@data-testid='generic-dropdown-list']/button/p[text()='${accountType}']`);

            await this.page.fill('#name', data.name);
            await this.page.fill('#alias', data.name);
            await this.page.fill('#rut', data.rut);
            await this.page.fill('#email', data.email || '');
            await this.page.fill('#amount', amount);

            if (await this._confirmTransfer()) {
                await this.waitToTransfer();
            }
        }
    }

    async waitToTransfer() {
        try {
            await this.page.findElement('div.loader-modal', {timeout: 30000});
            await this.page.findElement('button:has-text("Realizar otra transferencia")');
            await this.page.findElement('div.amount-info');
        } catch (error) {
            console.log("Error en la transferencia");
        }
    }

    async clickMenuOption(option) {
        await this.page.click(`div.menu-tab-container:has-text("${option}")`);
    }

}

export default TefPage;