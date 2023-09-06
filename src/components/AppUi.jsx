import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";

import "../styles/global.scss"

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const AppUi = () => {
    const { 
        width, 
        height,
        layout, 
        styleSheet, 
        paccaLabImage,
        fundacionImage,
        clusterOneManual,
        graphList
    } = React.useContext(AppContext);
    console.log("AppContext", AppContext);
    let myCyRef; 
    return (
        <React.Fragment>
            <ProteinFilter />
            <ExecuteBar  
                href={clusterOneManual.href} 
                label={clusterOneManual.label}
            />
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
            <div
                style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                backgroundColor: "white"
            }}>
                {graphList.map((graphData) => (
                    <CytoscapeComponent
                        elements={
                            CytoscapeComponent.normalizeElements(graphData)
                        }
                        // pan={{ x: 200, y: 200 }}
                        style={{ width: width, height: height }}
                        zoomingEnabled={true}
                        maxZoom={3}
                        minZoom={0.1}
                        autounselectify={false}
                        boxSelectionEnabled={true}
                        layout={layout}
                        stylesheet={styleSheet}
                        cy={
                            cy => {
                                myCyRef = cy;
                                console.log("CY object", cy);
                                cy.on("tap", "node", evt => {
                                    var node = evt.target;
                                    console.log("EVT", evt);
                                    console.log("TARGET", node.data());
                                    console.log("TARGET TYPE", typeof node[0]);
                                });
                                }
                        }
                        abc={console.log("myCyRef", myCyRef)} 
                        key={graphData.code} 
                    />
                ))}
            </div>
            <DownloadButton />
            <InfoButton />
        </React.Fragment>
    );
};

export { AppUi };
