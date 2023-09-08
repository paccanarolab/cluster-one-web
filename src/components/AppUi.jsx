import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";
import { Backdrop, CircularProgress } from '@mui/material';

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
                height: "100vh",
                position: "absolute",
                top: "0px",
                left: "0px",
                backgroundColor: "white"
            }}>
                <CytoscapeComponent
                    elements={
                        CytoscapeComponent.normalizeElements(cyGraph)
                    }
                    pan={{ x: 0, y: 0 }}
                    style={{ width: "100%", height: "100%"}}
                    zoomingEnabled={true}
                    maxZoom={3}
                    minZoom={0.1}
                    zoom={1}
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
                                    console.log("Node: ", node); //show node info
                                });
                            });
                        }
                    }
                />
            </div>
            {loading && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            }
            <DownloadButton />
            <InfoButton />
        </React.Fragment>
    );
};

export { AppUi };
