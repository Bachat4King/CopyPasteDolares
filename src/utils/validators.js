function removerTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function validateRut(datos) {
    datos.rut = datos.rut.replace(/[.\s]/g, "");
    if (!datos.rut.includes("-")) {
        datos.rut = datos.rut.slice(0, -1) + "-" + datos.rut.slice(-1);
    }

    return datos;
}

function validateAccountNumber(datos) {

    // Remove leading zeros
    datos.account_number = datos.account_number.replace(/^0+/, "");

    if (datos.bank.toLowerCase().includes("estado")) {
        if (
            datos.account_number.slice(-2).includes("-") ||
            datos.account_number === datos.rut.replace("-", "")
        ) {
            datos.account_number = datos.account_number.slice(0, -1);
            if (datos.account_number.length >= 16) {
                datos.account_number = datos.rut.slice(0, -1).replace("-", "");
            } else if (!/^\d+$/.test(datos.account_number)) {
                datos.account_number = datos.rut.slice(0, -1).replace("-", "");
            }
        }

        if (datos.account_number.length >= 16) {
            datos.account_number = datos.rut.slice(0, -1).replace("-", "");
        } else if (!/^\d+$/.test(datos.account_number)) {
            datos.account_number = datos.rut.slice(0, -1).replace("-", "");
        }
    }

    // Remove all non-numeric characters
    datos.account_number = datos.account_number.replace(/[-. ]/g, "");


    return datos;
}

function validateAccountType(datos) {
    const accountTypeMap = new Map([
        ["rut", "Cuenta Vista"],
        ["ru", "Cuenta Vista"],
        ["ctmrut", "Cuenta Vista"],
        ["ruk", "Cuenta Vista"],
        ["run", "Cuenta Vista"],
        ["rur", "Cuenta Vista"],
        ["rutcuenta", "Cuenta Vista"],
        ["rutcuneta", "Cuenta Vista"],
        ["rutacuenta", "Cuenta Vista"],
        ["rutacuneta", "Cuenta Vista"],
        ["rutacuentavista", "Cuenta Vista"],
        ["rutacuentavist", "Cuenta Vista"],
        ["ruth", "Cuenta Vista"],

        ["cuentavista", "Cuenta Vista"],
        ["cuentarut", "Cuenta Vista"],
        ["cuentarud", "Cuenta Vista"],
        ["cuentaruth", "Cuenta Vista"],
        ["cuantarut", "Cuenta Vista"],
        ["cuentarun", "Cuenta Vista"],
        ["cuentarutcuentavista", "Cuenta Vista"],
        ["cuentavistacuentarut", "Cuenta Vista"],
        ["cuentarutvisa", "Cuenta Vista"],
        ["cuentarutdebito", "Cuenta Vista"],
        ["cuentaru", "Cuenta Vista"],
        ["cuentavistarut", "Cuenta Vista"],
        ["cuentarutvista", "Cuenta Vista"],
        ["cuentarutvisadebito", "Cuenta Vista"],

        ["cunetarut", "Cuenta Vista"],
        ["cuneraru", "Cuenta Vista"],
        ["cuebtarut", "Cuenta Vista"],
        ["cuestarut", "Cuenta Vista"],
        ["ctarut", "Cuenta Vista"],

        ["debito", "Cuenta Vista"],
        ["debit", "Cuenta Vista"],
        ["deb", "Cuenta Vista"],
        ["devito", "Cuenta Vista"],
        ["debitovisa", "Cuenta Vista"],

        ["crédito", "Cuenta Vista"],
        ["credito", "Cuenta Vista"],
        ["credit", "Cuenta Vista"],

        ["chequeraelectrica", "Cuenta Vista"],
        ["chequeraelectronica", "Cuenta Vista"],

        ["visa", "Cuenta Vista"],
        ["visadebito", "Cuenta Vista"],
        ["visarut", "Cuenta Vista"],

        ["cuentavisa", "Cuenta Vista"],

        ["bancovisa", "Cuenta Vista"],

        ["vista", "Cuenta Vista"],
        ["vists", "Cuenta Vista"],
        ["vist", "Cuenta Vista"],
        ["vistaa", "Cuenta Vista"],
        ["vistaaa", "Cuenta Vista"],
        ["vistacuentarut", "Cuenta Vista"],

        ["cuentalukascuentavista", "Cuenta Vista"],
        ["cuentamaslukascuentavista", "Cuenta Vista"],
        ["cuentamaslukasvista", "Cuenta Vista"],
        ["cuentamaslukas", "Cuenta Vista"],
        ["cuentamasluka", "Cuenta Vista"],
        ["cuentalukas", "Cuenta Vista"],
        ["cuentaluka", "Cuenta Vista"],
        ["cuentamaslucas", "Cuenta Vista"],
        ["cuentamasluca", "Cuenta Vista"],
        ["cuentalucas", "Cuenta Vista"],
        ["cuentaluca", "Cuenta Vista"],
        ["cuentamaslucasvista", "Cuenta Vista"],

        ["corr", "Cuenta Corriente"],
        ["corriente", "Cuenta Corriente"],
        ["corrient", "Cuenta Corriente"],
        ["corrientes", "Cuenta Corriente"],
        ["corrientee", "Cuenta Corriente"],
        ["corrienta", "Cuenta Corriente"],

        ["cuentadeahorro", "Cuenta Ahorro"],
        ["cuentadeahorros", "Cuenta Ahorro"],
        ["cuentadeahorr", "Cuenta Ahorro"],
        ["cuentadeahorra", "Cuenta Ahorro"],
        ["cuentaahorro", "Cuenta Ahorro"],
        ["cuentaahorros", "Cuenta Ahorro"],
        ["cuentaahorr", "Cuenta Ahorro"],
        ["cuentaahorra", "Cuenta Ahorro"],
        ["ahorro", "Cuenta Ahorro"],
        ["ahorros", "Cuenta Ahorro"],
        ["ahorr", "Cuenta Ahorro"],
        ["ahorra", "Cuenta Ahorro"],
    ]);

    const accountType = removerTildes(datos.account_type.toLowerCase()).replace(
        /[^a-z]/g,
        ""
    );
    const bank = datos.bank.toLowerCase();

    const bankVistaKeywords = ["pago", "tenpo", "tempo"];
    const normalizedAccountType =
        accountTypeMap.get(accountType) || "Cuenta Corriente";

    if (
        normalizedAccountType === "Cuenta Corriente" &&
        bankVistaKeywords.some((keyword) => bank.includes(keyword))
    ) {
        datos.account_type = "Cuenta Vista";
    } else {
        datos.account_type = normalizedAccountType;
    }

    datos.account_type = datos.account_type.replace(/\b\w/g, (c) =>
        c.toUpperCase()
    );

    return datos;
}

function validateBank(datos) {
    const bankMappings = new Map([
        ["bancosantanderchile", "Banco Santander"],

        ["bcichile", "Banco BCI"],
        ["bancobci", "Banco BCI"],
        ["bci", "Banco BCI"],
        ["bcimach", "Banco BCI"],
        ["mach", "Banco BCI"],
        ["machbci", "Banco BCI"],
        ["bcibancocreditoinversiones", "Banco BCI"],
        ["bancocreditoinversiones", "Banco BCI"],

        ["mercadopago", "Mercado Pago"],

        ["bancoitau", "Banco Itau"],
        ["itau", "Banco Itau"],

        ["bancoscotiabank", "Banco Scotiabank"],
        ["scotiabank", "Banco Scotiabank"],

        ["bancoripley", "Banco Ripley"],
        ["ripley", "Banco Ripley"],

        ["bancobice", "Banco BICE"],
        ["bice", "Banco BICE"],

        ["bancosecurity", "Banco Security"],
        ["security", "Banco Security"],

        ["tenpo", "Tenpo"],
        ["tenpoprepago", "Tenpo"],
        ["tempo", "Tenpo"],
        ["tempoprepago", "Tenpo"],

        ["tapp", "TAPP Caja Los Andes"],
        ["cajalosandes", "TAPP Caja Los Andes"],
        ["tapplosandes", "TAPP Caja Los Andes"],
        ["tapocajalosandes", "TAPP Caja Los Andes"],
        ["tapo", "TAPP Caja Los Andes"],
        ["tappo", "TAPP Caja Los Andes"],
    ]);

    const bank = removerTildes(datos.bank.toLowerCase()).replace(/[^a-z]/g, "");
    datos.bank = bankMappings.get(bank) || datos.bank;

    return datos;
}

export {
    validateRut,
    validateAccountNumber,
    validateAccountType,
    validateBank,
    removerTildes,
};
