import React from "react";
import { Cy } from "./CyGraph.jsx";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";


const paccaLabImage = {
    image: "https://paccanarolab.org/wp-content/uploads/2023/02/Logo-v2.png",
    url: "https://www.paccanarolab.org/",
    classname: "labImage"
};

const fundacionImage = {
    image: "https://portal.fgv.br/sites/portal.fgv.br/themes/portalfgv/logo.png",
    url: "https://portal.fgv.br/en",
    classname: "fundacionImage"
};
// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
// El metodo forEach() ejecuta la funcion indicada una vez por cada elemento del array.
// para cada cy tiene que tener una key unica, react necesita saber que elemento esta cambiando
const App = () => {

    return (
        <React.Fragment>
            <ExecuteBar  href={'https://paccanarolab.org/clusterone/'} label={'ClusterONE Manual'}/>
            <ProteinFilter />
            <LabImage 
                image={paccaLabImage.image}
                url={paccaLabImage.url}
                classname={paccaLabImage.classname}
            />
            <LabImage 
                image={fundacionImage.image}
                url={fundacionImage.url}
                classname={fundacionImage.classname}    
            />
            <DownloadButton />
            <InfoButton />

        </React.Fragment>
    );
};

export default App;
