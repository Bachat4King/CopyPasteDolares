import {validateRut, validateAccountNumber, validateAccountType, validateBank, removerTildes} from './validators.js';




export default function getBankData(fileData, datos = {}) {
    let indexes = [];

    try {
        if (fileData[0].toLowerCase().includes('santander')) {
            indexes = [0, 8, 6, 4, 10, 12];
        } else if (fileData[0].toLowerCase().includes('falabella')) {
            if (!fileData[7].includes('Correo electronico')) {
                indexes = [0, 2, 4, 6, 8];
            } else {
                indexes = [0, 2, 4, 6, 8, 10];
            }
        } else if (fileData[0].toLowerCase().includes('estado')) {
            indexes = [0, 8, 6, 4, 10, 12];
        } else if (fileData[0].toLowerCase().includes('bci')) {
            indexes = [0, 8, 4, 6, 10, 2];
        } else if (fileData[0].toLowerCase().includes('chile')) {
            indexes = [0, 8, 6, 4, 10, 12];
        } else if (fileData[0].toLowerCase().includes('banco específico')) {
            indexes = [4, 8, 6, 2];
        }

        if (indexes.length) {
            const values = indexes;
            datos.bank = fileData[values[0]];
            datos = validateBank(datos);
            datos.rut = fileData[values[1]];
            datos = validateRut(datos);
            datos.account_number = fileData[values[2]];
            datos = validateAccountNumber(datos);

            if (fileData[0].toLowerCase().includes('banco específico')) {
                datos.account_type = 'Cuenta Corriente';
                datos.email = '';
                datos.name = fileData[values[3]];
                datos = validateAccountType(datos);
            } else {
                datos.account_type = fileData[values[3]];
                datos = validateAccountType(datos);

                if (!fileData[7].includes('Correo electronico') && fileData[0].toLowerCase().includes('falabella')) {
                    datos.email = '';
                    datos.name = fileData[values[4]];
                } else {
                    datos.email = fileData[values[4]];
                    datos.name = fileData[values[5]];
                }
            }

            datos.name = removerTildes(datos.name);
        }
    } catch (error) {
        console.error('Error en el archivo');
    }

    return datos;
}

