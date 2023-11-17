import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";
import { Backdrop, CircularProgress } from '@mui/material';
import { CheckboxLabels } from "./CheckboxLabels.jsx";
import { Typography } from "@mui/material";
import { Enrichment } from "./Enrichment.jsx";
import { ProteinModal } from "./ProteinModal.jsx";
import { AboutModal } from "./AboutModal.jsx";

import "../styles/global.scss"

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const AppUi = () => {
    const {
        layout, 
        stylesheet, 
        paccaLabImage,
        fundacionImage,
        clusterOneManual,
        cyGraph,
        cyGraphList,
        loading,
        loadingMessage,
        setCyEvent,
        setCyGraph,
        setShowHighlight,
        setShowWeight,
        getProteinInfo,
        setOpenProteinInfo,
    } = React.useContext(AppContext);
    return (
        <React.Fragment>
            {cyGraph.code && <ProteinFilter />}
            {
                cyGraph.code &&
                <CheckboxLabels 
                    label={"Highlight overlapping proteins"}
                    onChangeFunc={
                        (event) => {
                            setShowHighlight(event.target.checked)
                        }
                    }
                    style={
                        {
                            position: "absolute",
                            right: "0px",
                            margin: "10px",
                            zIndex: "1000",
                            top: "5%",
                            left: "48%",
                        }
                    }
                />
            }
            {
                cyGraph.code &&
                <CheckboxLabels
                    label={"Show weight"}
                    onChangeFunc={
                        (event) => {
                            setShowWeight(event.target.checked)
                        }
                    }
                    style={
                        {
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            margin: "10px",
                            zIndex: "1000",
                            top: "5%",
                            left: "65%",
                        }
                    }
                />
            }
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
                    pan={{ x: 30, y: 0 }}
                    style={{ width: "100%", height: "100%"}}
                    zoomingEnabled={true}
                    maxZoom={3}
                    minZoom={0.1}
                    zoom={0.5}
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
                                    if (node.data('type') === "proteinComplex") {
                                        console.log("Is CLuster!");
                                        var node_id = node.data('id');
                                        cyGraphList.forEach((graph) => {
                                            if (graph.code === node_id) {
                                                setCyGraph(graph);
                                            }
                                        });
                                    } else {
                                        // Cuando quiera que sea mas animado el zoom, descomentar esto:
                                        // console.log("Node: ", node);
                                        // cy.animate({
                                        //     fit: {
                                        //         eles: node,
                                        //         padding: 50
                                        //     },
                                        //     duration: 1000
                                        // });
                                        cy.zoom({
                                            level: 1,
                                            position: { x: nodePosition.x, y: nodePosition.y }
                                        });
                                    }
                                });
                                
                                node.on("click", function(evt) {
                                    if (node.data('type') !== "proteinComplex") {
                                        getProteinInfo(node.data('label'));
                                        setOpenProteinInfo(true);
                                        let connectedEdges = node.connectedEdges();
                                        connectedEdges.forEach(edge => {
                                                edge.style("line-color", "#C65151");
                                            }
                                        );
                                    }
                                });
                            });
                        }
                    }
                />
            </div>
            {loading && <Backdrop
                sx={
                    { 
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1 
                    }
                }
                open={loading}
              >
                <CircularProgress color="inherit" style={
                    {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginTop: -12,
                        marginLeft: -12,
                    }
                } />
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={
                        { 
                            paddingTop: 2, 
                            textAlign: 'center',
                        }
                    }
                    style={
                        {
                            position: 'absolute',
                            top: '60%',
                            left: '51.5%',
                            transform: 'translate(-50%, -50%)',
                        }
                    }
                >
                    {loadingMessage}
                </Typography>
              </Backdrop>
            }
            <DownloadButton />
            <AboutModal />
            <InfoButton />
            {cyGraph.code && <Enrichment/>}
            <ProteinModal/>
        </React.Fragment>
    );
};

export { AppUi };
