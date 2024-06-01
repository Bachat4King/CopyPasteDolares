function constructData(data) {
    // Dividir los datos en líneas y eliminar espacios en blanco alrededor de cada línea
    const lines = data.split("\n").map(line => line.trim()).filter(line => line);

    // Verificar si "@" está presente en alguna línea
    const hasEmail = lines.some(line => line.includes("@"));

    let keys;
    if (!hasEmail) {
        keys = ["name", "bank", "rut", "account_type", "account_number"];
    } else {
        keys = ["name", "bank", "rut", "account_type", "account_number", "email"];
    }

    // Verificar si hay suficientes líneas para construir el objeto
    if (lines.length >= keys.length - 1) {
        // Crear el objeto utilizando las claves y las líneas correspondientes
        const dataObject = {};
        keys.forEach((key, index) => {
            dataObject[key] = lines[index];
        });

        // Capitalizar las claves 'banco' y 'tipo_cuenta' si existen en el objeto
        if (dataObject['bank']) {
            dataObject['bank'] = dataObject['bank'].toUpperCase();
        }
        if (dataObject['account_type']) {
            dataObject['account_type'] = dataObject['account_type'].toUpperCase();
        }
        dataObject['account_number'] = dataObject['account_number'].replace(/ /g, "");

        return dataObject;
    } else {
        console.error("Error: No hay suficientes líneas para construir el objeto");
        return null;
    }
}

export {constructData};