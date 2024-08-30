import { useState } from "react";
import "./App.css";
import getBankData from "./utils/bank.js";

function App() {
  const [text, setText] = useState("");
  const [displayObject, setDisplayObject] = useState({});
  const [displayMessage, setDisplayMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMesagge] = useState(false);

  const handleChange = (event) => {
    setDisplayMessage("");
    setText(event.target.value);
  };

  const handleClick = () => {
    setText("");
    const data = getBankData(text.split("\n"));

    if (
      data.account_number !== data.rut?.slice(0, -2) &&
      data.bank.toLowerCase().includes("estado") &&
      !data.account_type.toLowerCase().includes("corriente") &&
      !data.account_type.toLowerCase().includes("ahorro")
    ) {
      setDisplayErrorMesagge(true);
      navigator.clipboard.writeText("");
      setDisplayMessage(
        "NO TRANSFERIR, NO COPIADO: NÚMERO DE CUENTA Y RUT NO COINCIDEN"
      );
      return;
    } else {
      setDisplayErrorMesagge(false);
    }
    setDisplayObject(data);
    const displayString = buildDisplayString(data);
    if (!displayString) {
      navigator.clipboard.writeText("");
      setDisplayMessage("El Formato de los datos no es correcto");
      return;
    }
    clearClipboardAndCopy(displayString);
    setDisplayMessage("Datos Copiados al Portapapeles");
  };

  const buildDisplayString = (data) => {
    let displayString = "";
    if (data.name) displayString += `${data.name}\n`;
    if (data.bank) displayString += `${data.bank}\n`;
    if (data.rut) displayString += `${data.rut}\n`;
    if (data.account_type) displayString += `${data.account_type}\n`;
    if (data.account_number) displayString += `${data.account_number}\n`;
    if (data.email) displayString += `${data.email}\n`;
    return displayString;
  };

  const clearClipboardAndCopy = (displayString) => {
    navigator.clipboard
      .writeText("")
      .then(() => {
        navigator.clipboard
          .writeText(displayString)
          .then(() => {})
          .catch((err) => {
            console.error("Error al copiar al portapapeles: ", err);
          });
      })
      .catch((err) => {
        console.error("Error al limpiar el portapapeles: ", err);
      });
  };

  return (
    <div className="App">
      <div className="input-section">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Pega los datos aca..."
        />
        <button onClick={handleClick}>Copiar Datos</button>
        {<div>{displayMessage} </div>}
      </div>
      <div className="display-section">
        {displayErrorMessage && (
          <div>
            Revisa el número de cuenta, no coincide con el RUT NO TRANSFERIR
          </div>
        )}
        {!displayErrorMessage && (
          <div>
            {displayObject.name && (
              <>
                {displayObject.name}
                <br />
              </>
            )}
            {displayObject.bank && (
              <>
                {displayObject.bank}
                <br />
              </>
            )}
            {displayObject.rut && (
              <>
                {displayObject.rut}
                <br />
              </>
            )}
            {displayObject.account_type && (
              <>
                {displayObject.account_type}
                <br />
              </>
            )}
            {displayObject.account_number && (
              <>
                {displayObject.account_number}
                <br />
              </>
            )}
            {displayObject.email && (
              <>
                {displayObject.email}
                <br />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
