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
import { MyMenuButton } from "./MenuButtom.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import { Layout } from "./Layout.jsx";
import "../styles/global.scss";
import "../styles/ProteinFilter.scss";

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const AppUi = () => {
    const {
        layout, 
        stylesheet, 
        paccaLabImage,
        fundacionImage,
        clusterOneManual,
        cyGraph,
        goaFileName,
        cyGraphList,
        loading,
        loadingMessage,
        setCyEvent,
        setCyGraph,
        setShowHighlight,
        setShowWeight,
        getProteinInfo,
        setOpenProteinInfo,
        openProteinInfo,
        showMenu,
        showHighlight,
        showWeight,
    } = React.useContext(AppContext);
    //comentario test
    return (
        <React.Fragment>
            {
                cyGraph.code && 
                <ProteinFilter
                    top={"6%"}
                    left={showMenu ? "30%" : "15%"}
                />
            }
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
                            top: "3%",
                            left: showMenu ? "40%" : "25%",
                        }
                    }
                    checked={showHighlight}
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
                            top: "3%",
                            left: showMenu ? "60%": "45%",
                        }
                    }
                    checked={showWeight}
                />
            }
            {cyGraph.code && 
                <div
                    style={{
                        position: "absolute",
                        top: "6%",
                        left: showMenu ? "80%" : "65%",
                        zIndex: "1000",
                    }}
                    className={"proteinContainer"}>
                    <label htmlFor="proteinSelect" className={"proteinLabel"}>Layout:</label>    
                    <Layout 
                        classname="proteinDropdown"
                    />
                </div>
            }
            <MyMenuButton />
            { showMenu && 
                <ExecuteBar  
                    href={clusterOneManual.href} 
                    label={clusterOneManual.label}
                /> 
            }
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
                            if (showMenu===true) {
                                cy.center();
                            } else {
                                // Necesito restar en el eje X el tamanio del menu
                                let center = cy.center();
                                console.log(center);
                                cy.center({ x: center.x - 50, y: center.y });
                            }

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
                                            if (openProteinInfo === true) {
                                                edge.style("line-color", "#C65151");
                                            }
                                            if (openProteinInfo === false) {
                                                edge.style("line-color", "#618CB3");
                                            }
                                        });
                                    }
                                })
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
                            left: showMenu ? '51.5%' : '50%',
                            transform: 'translate(-50%, -50%)',
                        }
                    }
                >
                    {loadingMessage}
                </Typography>
              </Backdrop>
            }
            {cyGraph.code && <ClusterFilter /> }
            <DownloadButton />
            <AboutModal />
            <InfoButton />
            {(goaFileName !== "" && cyGraph.code) && <Enrichment/>}
            <ProteinModal/>
        </React.Fragment>
    );
};

export { AppUi };
