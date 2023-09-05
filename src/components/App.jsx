import React from "react";
import { Cy } from "./CyGraph.jsx";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";


const proteins = [
    {
        id: "P12345",
        info: "Protein of interest"
    },
    {
        id: "P12346",
        info: "Protein of interest"
    },
    {
        id: "P12347",
        info: "Protein of interest"
    }
];

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
// El metodo forEach() ejecuta la funcion indicada una vez por cada elemento del array.
// para cada cy tiene que tener una key unica, react necesita saber que elemento esta cambiando
const App = () => {

    return (
        <React.Fragment>
            <ExecuteBar />
            <ul>
                {proteins.map((protein) => {
                    return (
                        <Cy 
                            key={protein.id}
                            protein_info={protein.info}
                            protein_id={protein.id}
                        />   
                    );
                })}
            </ul>
            <DownloadButton />
            <InfoButton />

        </React.Fragment>
    );
};

export default App;
