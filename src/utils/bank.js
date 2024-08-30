import {
    validateRut,
    validateAccountNumber,
    validateAccountType,
    validateBank,
    validateName,
} from "./validators.js";

export default function getBankData(fileData) {
    let indexes = [];
    const commonBanks = [
        "banco santander chile",
        "banco estado",
        "banco de chile",
    ];
    let bank = fileData[0].toLowerCase();
    let data = {};

    try {
        if (commonBanks.some((commonBank) => commonBank.includes(bank))) {
            indexes = [0, 8, 6, 4, 10, 12];
        } else if (bank.includes("falabella")) {
            if (!fileData[7].includes("Correo electronico")) {
                indexes = [0, 2, 4, 6, 8];
                data.email = "";

            } else {
                indexes = [0, 2, 4, 6, 8, 10];
            }
        } else if (bank.includes("bci")) {
            indexes = [0, 8, 4, 6, 10, 2];
        } else if (bank.includes("banco específico")) {
            indexes = [4, 8, 6, 2];

            data["accountType"] = "Cuenta Corriente";
            data["email"] = "";
            data["bank"] = fileData[indexes[0]];
            data["rut"] = fileData[indexes[1]];
            data["accountNumber"] = fileData[indexes[2]];
            data["name"] = fileData[indexes[3]];

            data = validateName(data);
            data = validateBank(data);
            data = validateRut(data);
            data = validateAccountNumber(data);
            data = validateAccountType(data);

            return data;
        } else if (bank.includes("tenpo")) {
            indexes = [0, 8, 6, 4, 12, 10];
        }

        if (indexes.length) {
            const values = indexes;

            data.bank = fileData[values[0]];
            data.rut = fileData[values[1]];
            data.accountNumber = fileData[values[2]];
            data.accountType = fileData[values[3]];
            data.email = fileData[values[4]];
            data.name = fileData[values[5]];
            
            data = validateName(data);
            data = validateBank(data);
            data = validateRut(data);
            data = validateAccountType(data);
            data = validateAccountNumber(data);
        }

    } catch (error) {
        console.error(error);
    }

    console.log(data);
    return data;
}
