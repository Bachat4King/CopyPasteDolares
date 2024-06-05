function validateRut(datos) {
    datos.rut = datos.rut.replace(/[.\s]/g, '');
    if (!datos.rut.includes('-')) {
        datos.rut = datos.rut.slice(0, -1) + '-' + datos.rut.slice(-1);
    }

    return datos;
}

function validateAccountNumber(datos) {
    if (datos.bank.toLowerCase().includes("estado")) {
        if (datos.account_number.slice(-2).includes("-") || datos.account_number === datos.rut.replace('-', '')) {
            datos.account_number = datos.account_number.slice(0, -1);
            if (datos.account_number.length >= 16) {
                datos.account_number = datos.rut.slice(0, -1).replace('-', '');
            }
    
            else if (!/^\d+$/.test(datos.account_number)) {
                datos.account_number = datos.rut.slice(0, -1).replace('-', '');
            }
            
        }

        if (datos.account_number.length >= 16) {
            datos.account_number = datos.rut.slice(0, -1).replace('-', '');
        }

        else if (!/^\d+$/.test(datos.account_number)) {
            datos.account_number = datos.rut.slice(0, -1).replace('-', '');
        }
    }


    datos.account_number = datos.account_number.replace(/[-. ]/g, '');
    

    datos.account_number = datos.account_number.replace(/^0+/, '')

    return datos;
}

function validateAccountType(datos) {
    const accountType = datos.account_type.toLowerCase();
    const bank = datos.bank.toLowerCase();

    const rutKeywords = ['rut', 'cuentarut', 'cuentarud', 'cuentaruth', 'ru', 'cuentaru', 'ctmrut', 'ruk', 'run',
                        'cuentavistarut','cuentarutvista', 'vistacuentarut', 'cunetarut', 'cuneta ru',
                        'rutcuenta', 'rutcuneta', 'cuentarutcuentavista', 'cuentavistacuentarut', 'débito', 'debito', 'debit',
                        'crédito', 'credito', 'credit', 'ctarut', 'chequeraeléctrica', 'chequeraelectrica', 'visadebito', 'cuentarutvisa', 'debitovisa',
                        'cuentarutdebito', 'cuentarutdébito', 'chequeraelectrónica', 'cuebtarut', 'visa', 'rur', 'cuentavisa', 'cuestarut', 'devito',
                        'cuentarutvisadébito', 'cuentarun', 'visarut', 'bancovisa'];
    const bankKeywords = ['pago', 'tenpo', 'tempo'];

    if (rutKeywords.includes(accountType.replace(' ', '').replace('/', '').replace('-', '').replace("'\'", '')) || bankKeywords.some(keyword => bank.includes(keyword))) {
        datos.account_type = 'Cuenta Vista';
    } else if (accountType.includes('vista') || accountType.includes('vists')) {
        datos.account_type = 'Cuenta Vista';
    } else if (accountType.includes('corriente')) {
        datos.account_type = 'Cuenta Corriente';
    } else if (accountType.includes('cuenta de ahorra')) {
        datos.account_type = 'Cuenta Ahorro';
    } else {
        datos.account_type = 'Cuenta Corriente';
    }

    datos.account_type = datos.account_type.replace(/\b\w/g, c => c.toUpperCase());

    return datos;
}


function validateBank(datos) {

    if (datos.bank.toLowerCase().includes('banco santander chile')) {
        datos.bank = 'Banco Santander';
    }

    if (datos.bank.toLowerCase().includes('bci chile') || datos.bank.toLowerCase().includes('banco bci')
        || datos.bank.toLowerCase().includes('bancobci') || datos.bank.toLowerCase().includes('bci')
        || datos.bank.toLowerCase().includes('bci mach') || datos.bank.toLowerCase().includes('bcimach')
        || datos.bank.toLowerCase().includes('bci/mach') || datos.bank.toLowerCase().includes('mach')
        || datos.bank.toLowerCase().includes('mach bci') || datos.bank.toLowerCase().includes('mach bci')
        || datos.bank.toLowerCase().includes('machbci') || datos.bank.toLowerCase().includes('mach/bci')
        || datos.bank.toLowerCase().includes('bci banco crédito inversiones') || datos.bank.toLowerCase().includes('bcibancocréditoinversiones')
        || datos.bank.toLowerCase().includes('bci banco credito inversiones') || datos.bank.toLowerCase().includes('bcibancocreditoinversiones')
        || datos.bank.toLowerCase().includes('banco crédito inversiones') || datos.bank.toLowerCase().includes('bancocréditoinversiones')
        || datos.bank.toLowerCase().includes('banco credito inversiones') || datos.bank.toLowerCase().includes('bancocreditoinversiones')) {
        datos.bank = 'Banco BCI';
    }

    if (datos.bank.toLowerCase().includes('mercado pago') || datos.bank.toLowerCase().includes('mercadopago')) {
        datos.bank = 'Mercado Pago';
    }

    if (datos.bank.toLowerCase().includes('banco itau') || datos.bank.toLowerCase().includes('bancoitau')
        || datos.bank.toLowerCase().includes('banco itaú') || datos.bank.toLowerCase().includes('bancoitaú')
        || datos.bank.toLowerCase().includes('itau') || datos.bank.toLowerCase().includes('itaú')) {
        datos.bank = 'Banco Itau';
    }

    if (datos.bank.toLowerCase().includes('banco scotiabank') || datos.bank.toLowerCase().includes('bancoscotiabank') || datos.bank.toLowerCase().includes('scotiabank')) {
        datos.bank = 'Banco Scotiabank';
    }

    if (datos.bank.toLowerCase().includes('banco ripley') || datos.bank.toLowerCase().includes('bancoripley') || datos.bank.toLowerCase().includes('ripley')) {
        datos.bank = 'Banco Ripley';
    }

    if (datos.bank.toLowerCase().includes('banco bice') || datos.bank.toLowerCase().includes('bancobice') || datos.bank.toLowerCase().includes('bice')) {
        datos.bank = 'Banco BICE';
    }

    if (datos.bank.toLowerCase().includes('banco security') || datos.bank.toLowerCase().includes('bancosecurity') || datos.bank.toLowerCase().includes('security')) {
        datos.bank = 'Banco Security';
    }

    if (datos.bank.toLowerCase().includes('tenpo') || datos.bank.toLowerCase().includes('tenpo prepago')
        || datos.bank.toLowerCase().includes('tenpoprepago') || datos.bank.toLowerCase().includes('tempo')
        || datos.bank.toLowerCase().includes('tempo prepago') || datos.bank.toLowerCase().includes('tempoprepago')) {
        datos.bank = 'Tenpo';
    }

    if (datos.bank.toLowerCase().includes('tapp') || datos.bank.toLowerCase().includes('tapp caja los andes')
        || datos.bank.toLowerCase().includes('caja los andes') || datos.bank.toLowerCase().includes('cajalosandes')
        || datos.bank.toLowerCase().includes('tappcajalosades') || datos.bank.toLowerCase().includes('tapp caja los andes')
        || datos.bank.toLowerCase().includes('tapplosandes') || datos.bank.toLowerCase().includes('tapo caja los andes')
        || datos.bank.toLowerCase().includes('tapocajalosandes') || datos.bank.toLowerCase().includes('tapo')
    ) {
        datos.bank = 'TAPP Caja Los Andes';
    }

    return datos;
}

export {
    validateRut,
    validateAccountNumber,
    validateAccountType,
    validateBank
};