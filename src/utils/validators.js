import { validate, getCheckDigit } from 'rut.js'
import validator from 'validator';

import isValidCard from "./cardValidator";

function removeTildes(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function validateEmail(data) {

    if (validator.isEmail(data.email)) {
        return data
    }

    data.email = ''
    return data
}


function validateName(data) {
    data.name = removeTildes(data.name)
    return data
}

function validateRut(data) {
    let rut = data.rut.replace(/[.\s-_]/g, "");

    if (validate(rut)) {
        data.rut = rut.slice(0, -1) + '-' + rut.slice(-1, rut.length)
        return data
    }

    rut = rut + getCheckDigit(rut)

    if (validate(rut) && rut.length < 10 && rut.length > 7) {
        data.rut = rut.slice(0, -1) + '-' + rut.slice(-1, rut.length)
    }

    return data;
}

function validateAccountNumber(data) {
    data.accountNumber = data.accountNumber.replace(/[-. ]/g, '');
    let accountNumber = data.accountNumber

    const bank = data.bank.toLowerCase()
    const accountType = data.accountType.toLowerCase()

    const rut = data.rut.replace(/[.\s-_]/g, "");

    if (bank.includes('estado')) {
        accountNumber = accountNumber.replace(/^0+/, ''); // Remove leading zeros

        if (accountNumber === rut || accountNumber === rut.slice(0, -1)) {
            data.accountNumber = rut.slice(0, -1); // Remove the last character
            data.accountType = 'Cuenta Vista'
            return data
        } else if (accountNumber.length >= 15) {
            data.accountNumber = rut.slice(0, -1);
            data.accountType = 'Cuenta Vista'
            return data
        }
        else if (accountNumber.startsWith('4345')) {
            data.accountNumber = rut.slice(0, -1);
            data.accountType = 'Cuenta Vista'
            return data
        }
        else if (accountNumber.length < 7) {
            data.accountNumber = rut.slice(0, -1);
            data.accountType = 'Cuenta Vista'
            return data
        } else if (!/^\d+$/.test(accountNumber)) { // Check if it's not a digit
            data.accountNumber = rut.slice(0, -1);
            data.accountType = 'Cuenta Vista'
            return data
        } else if (accountNumber.startsWith('9') && !rut.startsWith('9')) {
            data.accountNumber = rut.slice(0, -1);
            data.accountType = 'Cuenta Vista'
            return data
        }

        else if (accountNumber !== rut.slice(0, -1) && !accountType.includes('corriente') && !accountType.includes('ahorro')) {
            data.accountNumber = '';
            return data
        }

        return data
    }
    else {
        if ((accountNumber === rut || accountNumber === rut.slice(0, -1)) && !bank.includes('estado')) {
            data.bank = 'Banco Estado';
            data.accountType = 'Cuenta Vista'
            return data
        }

        if (isValidCard(data.accountNumber)) {
            data.accountNumber = '';
            return data
        }

        return data
    }

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
        ["rutctavista", "Cuenta Vista"],
        ["rutvista", "Cuenta Vista"],

        ["cuentavista", "Cuenta Vista"],
        ["cuentavistarut", "Cuenta Vista"],
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
        ["cuentarur", "Cuenta Vista"],
        ["cuentavistarut", "Cuenta Vista"],
        ["cuentarutvista", "Cuenta Vista"],
        ["cuentarutvisadebito", "Cuenta Vista"],
        ["cuentafut", "Cuenta Vista"],
        ["cuantorut", "Cuenta Vista"],
        ["cuantoruth", "Cuenta Vista"],
        ["cuentabrut", "Cuenta Vista"],
        ["cuentaviata", "Cuenta Vista"],
        ["cuenta rit", "Cuenta Vista"],
        ["cuenta ruc", "Cuenta Vista"],
        ["cuentavistactarut", "Cuenta Vista"],
        ["cuentavosta", "Cuenta Vista"],
        ["cuentavistam", "Cuenta Vista"],
        ["cuentatut", "Cuenta Vista"],

        ["cunetarut", "Cuenta Vista"],
        ["cunetaruc", "Cuenta Vista"],
        ["cunetaruth", "Cuenta Vista"],
        ["cuenarut", "Cuenta Vista"],
        ["cunetavista", "Cuenta Vista"],
        ["cuneraru", "Cuenta Vista"],
        ["cuebtarut", "Cuenta Vista"],
        ["cuestarut", "Cuenta Vista"],
        ["ctarut", "Cuenta Vista"],
        ["ctavista", "Cuenta Vista"],
        ["cuetarut", "Cuenta Vista"],
        ["cunentarut", "Cuenta Vista"],
        ["cuentaeut", "Cuenta Vista"],
        ["cuantavista", "Cuenta Vista"],
        ["cuentevista", "Cuenta Vista"],

        ["debito", "Cuenta Vista"],
        ["debit", "Cuenta Vista"],
        ["deb", "Cuenta Vista"],
        ["devito", "Cuenta Vista"],
        ["debitovisa", "Cuenta Vista"],
        ["debitocuentarut", "Cuenta Vista"],

        ["crédito", "Cuenta Vista"],
        ["credito", "Cuenta Vista"],
        ["credit", "Cuenta Vista"],

        ["chequera", "Cuenta Corriente"],
        ["chequeraelectrica", "Cuenta Corriente"],
        ["chequeraelectronica", "Cuenta Corriente"],

        ["visa", "Cuenta Vista"],
        ["visadebito", "Cuenta Vista"],
        ["visadeb", "Cuenta Vista"],
        ["visarut", "Cuenta Vista"],

        ["cuentavisa", "Cuenta Vista"],

        ["bancovisa", "Cuenta Vista"],

        ["vista", "Cuenta Vista"],
        ["viste", "Cuenta Vista"],
        ["vistadebito", "Cuenta Vista"],
        ["vistadeb", "Cuenta Vista"],
        ["vists", "Cuenta Vista"],
        ["vist", "Cuenta Vista"],
        ["vidta", "Cuenta Vista"],
        ["vistaa", "Cuenta Vista"],
        ["vistaaa", "Cuenta Vista"],
        ["vistacuentarut", "Cuenta Vista"],
        ["vistamaslucasdebito", "Cuenta Vista"],
        ["vistaaccount", "Cuenta Vista"],
        ["vusta", "Cuenta Vista"],
        ["vistarut", "Cuenta Vista"],

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
        ["cuentamaslucasdebito", "Cuenta Vista"],
        ["cuentavistamaslucas", "Cuenta Vista"],

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
        ["plazoviviendagirodefinido", "Cuenta Ahorro"],
        ["platinogirodiferido", "Cuenta Ahorro"],
        ["platino giro diferido unipersonal", "Cuenta Ahorro"],

    ]);

    const accountType = removeTildes(datos.accountType.toLowerCase()).replace(
        /[^a-z]/g,
        ""
    );
    const bank = datos.bank.toLowerCase();

    const bankVistaKeywords = ["pago", "tenpo", "tempo", "tap", "andes", 'mercado'];

    const normalizedAccountType =
        accountTypeMap.get(accountType) || "Cuenta Corriente";

    if (
        normalizedAccountType === "Cuenta Corriente" &&
        bankVistaKeywords.some((keyword) => bank.includes(keyword))
    ) {
        datos.accountType = "Cuenta Vista";
    } else {
        datos.accountType = normalizedAccountType;
    }

    datos.accountType = datos.accountType.replace(/\b\w/g, (c) =>
        c.toUpperCase()
    );

    return datos;
}

function validateBank(data) {
    const bankMappings = new Map([
        ["bancosantanderchile", "Banco Santander"],
        ["ancosantanderchile", "Banco Santander"],

        ["bcichile", "Banco BCI"],
        ["bancobci", "Banco BCI"],
        ["bci", "Banco BCI"],
        ["bcimach", "Banco BCI"],
        ["mach", "Banco BCI"],
        ["machbci", "Banco BCI"],
        ["bcibancocreditoinversiones", "Banco BCI"],
        ["bancocreditoinversiones", "Banco BCI"],
        ["bcibancodecreditoeinversiones", "Banco BCI"],
        ["bancodecreditoyinversionesbci", "Banco BCI"],
        ["machbcibancodecreditoeinversiones", "Banco BCI"],
        ["bancocreditosinversiones", "Banco BCI"],
        ["bancodecreditoeinversionesbcimach", "Banco BCI"],

        ["mercadopago", "Mercado Pago"],
        ["bancomercadopago", "Mercado Pago"],

        ["bancoitau", "Banco Itau"],
        ["itau", "Banco Itau"],
        ["itu", "Banco Itau"],

        ["bancoscotiabank", "Banco Scotiabank"],
        ["bancoscotiabankchile", "Banco Scotiabank"],
        ["scotiabank", "Banco Scotiabank"],
        ["scotiabankchile", "Banco Scotiabank"],
        ["scotiabank chile", "Banco Scotiabank"],
        ["scoitiabank", "Banco Scotiabank"],
        ["scotiabakchile", "Banco Scotiabank"],

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
        ["bancotenpo", "Tenpo"],
        ["banco prepago tenpo", "Tenpo"],

        ["tapp", "TAPP Caja Los Andes"],
        ["cajalosandes", "TAPP Caja Los Andes"],
        ["tapplosandes", "TAPP Caja Los Andes"],
        ["tapocajalosandes", "TAPP Caja Los Andes"],
        ["tapo", "TAPP Caja Los Andes"],
        ["tappo", "TAPP Caja Los Andes"],
    ]);

    let bank = data.bank.toLowerCase()

    bank = removeTildes(bank).replace(/[^a-z]/g, "");
    data.bank = bankMappings.get(bank) || data.bank;

    return data;
}

export {
    validateRut,
    validateAccountNumber,
    validateAccountType,
    validateBank,
    validateName,
    validateEmail
};
