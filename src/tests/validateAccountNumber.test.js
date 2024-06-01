const {
  validateRut,
  validateAccountNumber,
  validateAccountType,
  validateBank,
} = require("../utils/validators").default;

// rut con guion

test("Banco Estado: Numero De Cuenta - rut con guion - el numero de la tarjeta esta en el numero de cuenta", () => {
  let datos = {
    bank: "Banco Estado",
    rut: "18773497-5",
    account_number: "4345591260206473",
    account_type: "Cuenta Vista",
    email: "katherine28agus@gmail.com",
    name: "AVELLO NOVOA KATHERINE ANDREA",
  };
  let result = validateAccountNumber(datos);
  expect(result.account_number).toBe("18773497");
});
  

test("Banco Estado: Numero De Cuenta - rut igual a numero de cuenta sin puntos ni guion", () => {
    let datos = {
      bank: "Banco Estado",
      rut: "187734975",
      account_number: "187734975",
      account_type: "Cuenta Vista",
      email: "katherine28agus@gmail.com",
      name: "AVELLO NOVOA KATHERINE ANDREA",
    };
    let result = validateAccountNumber(datos);
    expect(result.account_number).toBe("18773497");
  
})

test("Banco Estado: Numero De Cuenta - rut igual a numero de cuenta con guion", () => {
  let datos = {
    bank: "Banco Estado",
    rut: "18773497-5",
    account_number: "18773497-5",
    account_type: "Cuenta Vista",
    email: "katherine28agus@gmail.com",
    name: "AVELLO NOVOA KATHERINE ANDREA",
  };
  let result = validateAccountNumber(datos);
  expect(result.rut).toBe("18773497-5");
  expect(result.account_number).toBe("18773497");
});

test("Banco Estado: Numero De Cuenta - rut igual a numero de cuenta con puntos y guion", () => {
  let datos = {
    bank: "Banco Estado",
    rut: "18.773.497-5",
    account_number: "18.773.497-5",
    account_type: "Cuenta Vista",
    email: "katherine28agus@gmail.com",
    name: "AVELLO NOVOA KATHERINE ANDREA",
  };
  let result = validateAccountNumber(datos);
  expect(result.account_number).toBe("18773497");
});

// rut sin guion

test("Banco Estado: Numero De Cuenta - sin guion - el numero de la tarjeta esta en el numero de cuenta", () => {
    let datos = {
      bank: "Banco Estado",
      rut: "187734975",
      account_number: "4345591260206473",
      account_type: "Cuenta Vista",
      email: "katherine28agus@gmail.com",
      name: "AVELLO NOVOA KATHERINE ANDREA",
    };
    let result = validateAccountNumber(datos);
    expect(result.account_number).toBe("18773497");
  });


// rut con guion y puntos

test("Banco Estado: Numero De Cuenta - sin guion - el numero de la tarjeta esta en el numero de cuenta", () => {
    let datos = {
      bank: "Banco Estado",
      rut: "18.773.497-5",
      account_number: "4345591260206473",
      account_type: "Cuenta Vista",
      email: "katherine28agus@gmail.com",
      name: "AVELLO NOVOA KATHERINE ANDREA",
    };
    let result = validateAccountNumber(datos);
    expect(result.account_number).toBe("18773497");
  });

  // rut sin guion y puntos

test("Banco Estado: Numero De Cuenta - sin guion - el numero de la tarjeta esta en el numero de cuenta", () => {
    let datos = {
      bank: "Banco Estado",
      rut: "18.773.4975",
      account_number: "4345591260206473",
      account_type: "Cuenta Vista",
      email: "katherine28agus@gmail.com",
      name: "AVELLO NOVOA KATHERINE ANDREA",
    };
    let result = validateAccountNumber(datos);
    expect(result.account_number).toBe("18773497");
  });
