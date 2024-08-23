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
import {ClusterFilterButtom} from "./ClusterFilterButtom.jsx";
import { ClusterInfo } from "./ClusterInfo.jsx";
import { Layout } from "./Layout.jsx";
import { HighLightCheckboxLabels } from "./HighLightCheckboxLabels.jsx";
import { AllResultsClusterOne } from "./AllResultsClusterOne.jsx";
import "../styles/global.scss";
import "../styles/ProteinFilter.scss";
import "../styles/ClusterFilter.scss";

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
        getProteinInfo,
        setOpenProteinInfo,
        showMenu,
        showHighlight,
        showWeight,
        showClusterFilter,
        showPPILoadedMessage,
        isPpiWeighted,
    } = React.useContext(AppContext);
    //comentario test
    return (
        <React.Fragment>
            <MyMenuButton/>
            { showMenu && 
                <ExecuteBar  
                    href={clusterOneManual.href} 
                    label={clusterOneManual.label}
                /> 
            }
            {
                cyGraph.code &&
                <ClusterInfo
                    top={"20px"}
                    left={showMenu ? "20%" : "3%"}
                />
            }
            {
                cyGraph.code && 
                <ClusterFilterButtom
                    top={"25px"}
                    left={showMenu ? "33%" : "15%"}
                /> 
            }
            {
                showClusterFilter && 
                <ClusterFilter 
                    top={"38px"}
                    left={showMenu ? "33%" : "15%"}    
                />
            }
            {
                cyGraph.code && 
                <ProteinFilter
                    top={"4.5%"}
                    left={showMenu ? "50%" : "30%"}
                />
            }
            {
                cyGraph.code && 
                <div
                    style={{
                        position: "absolute",
                        top: "4.5%",
                        left: showMenu ? "65%" : "45%",
                        zIndex: "1000",
                    }}
                    className={"proteinContainer"}
                >    
                    
                    <label htmlFor="proteinSelect" className={"proteinLabel"}>Layout:</label>
                    <Layout 
                        classname="proteinDropdown"
                    />
                    <i className={"fa fa-arrow-down dropdown-icon"}></i>
                </div>
            }
            {
                cyGraph.code &&(
                    <div key={cyGraph.code}>
                        <HighLightCheckboxLabels
                            label={"Highlight overlapping proteins"}
                            style={{
                                position: "absolute",
                                margin: "10px",
                                zIndex: "1000",
                                top: "15px",
                                left: showMenu ? "73%" : "53%",
                            }}
                        />
                    </div>
                )
            }
            {
                    (cyGraph.code && isPpiWeighted) && (
                        <CheckboxLabels
                            label={"Show weight"}
                            style={
                                {
                                    position: "absolute",
                                    margin: "10px",
                                    zIndex: "1000",
                                    top: "20%",
                                    right: "0.5%",
                                }
                            }
                        />
                    )
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
                    minZoom={0.01}
                    zoom={0.05}
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
                                        let connectedEdges = node.connectedEdges();
                                        connectedEdges.forEach(edge => {
                                            edge.style("line-color", "#C65151");
                                        });
                                        cy.edges().difference(connectedEdges).forEach(edge => {
                                            // Depende del tipo de edge
                                            if (edge.data('type') === "overlapping") {
                                                edge.style("line-color", "#B185B8");
                                            } else {
                                                edge.style("line-color", "#618CB3");
                                            }
                                        })
                                    }
                                });
                                
                            });
                            cy.on("cxttap", "node", evt => {
                                // evt.preventDefault(); // Disable context menu
                                var node = evt.target;
                                console.log("Is rightclick!");
                                if (node.data('type') !== "proteinComplex") {
                                    getProteinInfo(node.data('label'));
                                    setOpenProteinInfo(true);
                                }
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
            {showPPILoadedMessage && <Typography
                variant="h6"
                component="div"
                sx={{ 
                    paddingTop: 2, 
                    textAlign: 'center',
                }}
                style={
                    {
                        position: 'absolute',
                        top: '60%',
                        left: showMenu ? '51.5%' : '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'green',
                    }
                }
            >
                PPI loaded successfully! Now you can run ClusterONE
            </Typography>
            }

            {cyGraph.code && <AllResultsClusterOne/>}
            <DownloadButton />
            <AboutModal />
            <InfoButton />
            {(goaFileName !== "" && cyGraph.code) && <Enrichment/>}
            <ProteinModal/>
        </React.Fragment>
    );
};

export { AppUi };
