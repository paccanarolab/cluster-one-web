import React from "react";
import { AppUi } from "./AppUi.jsx";
import { AppContextProvider } from "./AppContext.jsx";

import "../styles/global.scss"

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const App = () => {
    return (
        <AppContextProvider>
            <AppUi/>
        </AppContextProvider>

    );
};

export default App;
