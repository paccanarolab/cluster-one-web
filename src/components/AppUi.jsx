import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";
import { Loading } from "./Loading.jsx";

import "../styles/global.scss"

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const AppUi = () => {
    const { 
        width, 
        height,
        layout, 
        stylesheet, 
        paccaLabImage,
        fundacionImage,
        clusterOneManual,
        cyGraph,
        loading,
        setCyEvent,
    } = React.useContext(AppContext);
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
                <CytoscapeComponent
                    elements={
                        CytoscapeComponent.normalizeElements(cyGraph)
                    }
                    pan={{ x: 150, y: 100 }}
                    style={{ width: width, height: height}}
                    zoomingEnabled={true}
                    maxZoom={3}
                    minZoom={0.1}
                    autounselectify={false}
                    boxSelectionEnabled={true}
                    layout={layout}
                    stylesheet={stylesheet}
                    cy={
                        cy => {
                            setCyEvent(cy);
                            cy.on("tap", "node", evt => {
                                var node = evt.target;
                                var nodePosition = node.position();
                                node.on("dblclick", function(evt) {
                                    console.log("Node: ", node);
                                    cy.zoom({
                                        level: 2,
                                        position: { x: nodePosition.x, y: nodePosition.y } // node.position.x, node.position.y
                                    });
                                });
                                node.on("click", function(evt) {
                                    console.log("Node: ", node);
                                });
                            });
                        }
                    }
                />
            </div>
            {loading && <Loading />}
            <DownloadButton />
            <InfoButton />
        </React.Fragment>
    );
};

export { AppUi };
