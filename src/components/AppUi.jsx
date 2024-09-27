import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";
import { Backdrop, CircularProgress } from '@mui/material';
import { Typography } from "@mui/material";
import { ProteinModal } from "./ProteinModal.jsx";
import { AboutModal } from "./AboutModal.jsx";
import { MyMenuButton } from "./MenuButtom.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import {ClusterFilterButtom} from "./ClusterFilterButtom.jsx";
import { ClusterInfo } from "./ClusterInfo.jsx";
import { Layout } from "./Layout.jsx";
import { HighLightCheckboxLabels } from "./HighLightCheckboxLabels.jsx";
import { AllResultsClusterOne } from "./AllResultsClusterOne.jsx";
import { BackdropWithProgress } from "./BakdropWithProgress.jsx";

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
        cyGraphList,
        loading,
        loadingMessage,
        loadingInterval,
        setCyEvent,
        setCyGraph,
        setProteinInfo,
        setOpenProteinInfo,
        showMenu,
        showClusterFilter,
        showPPILoadedMessage,
        getAllDatabases,
        showHighlight,
    } = React.useContext(AppContext);

    React.useEffect(() => {
        getAllDatabases();
    }, []);

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
                /*
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
                */
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
                                cy.center({ x: center.x - 50, y: center.y });
                            }

                            cy.on("tap", "node", evt => {
                                console.log("click on node", evt.target.data('label'));
                                var node = evt.target;
                                node.on("dblclick", function(evt) {
                                    // Double click on complex node to show it
                                    if (node.data('type') === "proteinComplex") {
                                        var node_id = node.data('id');
                                        cyGraphList.forEach((graph) => {
                                            if (graph.code === node_id) {
                                                setCyGraph(graph);
                                            }
                                        });
                                    }
                                    let connectedEdges = node.connectedEdges();
                                    let connectedNodes = [];
                                    connectedEdges.forEach(edge => {
                                        edge.style("line-color", "#C65151");
                                        edge.style("label", edge.data('label'));
                                        let source = edge.source();
                                        let target = edge.target();
                                        // If some node already exists in the array, it won't be added again
                                        if (!connectedNodes.includes(source) && source.data('type') !== "proteinComplex") {
                                            connectedNodes.push(source);
                                        }
                                        if (!connectedNodes.includes(target) && target.data('type') !== "proteinComplex") {
                                            connectedNodes.push(target);
                                        }
                                    });
                                    console.log("Connected nodes", connectedNodes);
                                    connectedNodes.forEach(connectedNode => {
                                        connectedNode.style("background-color", "#C65151");
                                        connectedNode.style("label", connectedNode.data('label'));
                                    });
                                });
                            });

                            cy.on("tap", evt => {
                                console.log("ONE click on background");
                                console.log("Event", evt);
                                let edges = cy.edges();
                                let nodes = cy.nodes();
                                edges.forEach(edge => {
                                    edge.style("label", "");
                                    if (edge.data('type') === "overlapping") {
                                        edge.style("line-color", "#B185B8");
                                    } else {
                                        edge.style("line-color", "#debc6e");
                                    }
                                });
                                nodes.forEach(node => {
                                    if (node.data('type') !== "proteinComplex") {
                                        console.log("Node", node);
                                        console.log("Show highlight", showHighlight);
                                        node.style("background-color", "#debc6e");
                                        node.style("label", "");
                                        // if (node.data().overlapping !== true) {
                                        //     node.style("background-color", "#debc6e");
                                        //     node.style("label", "");
                                        // } else {
                                        //     if (showHighlight === false) {
                                        //         node.style("background-color", "#debc6e");
                                        //         node.style("label", "");
                                        //     }
                                        // }
                                    }
                                });
                            });
                            cy.on("cxttap", "node", evt => {
                                var node = evt.target;
                                if (node.data('type') !== "proteinComplex") {
                                    setProteinInfo({
                                        protein: node.data('label'),
                                        data:`https://www.uniprot.org/uniprotkb/${node.data('label')}`
                                    });
                                    setOpenProteinInfo(true);
                                }
                            });
                        }
                    }
                />
            </div>
            {loading && <BackdropWithProgress showMenu={showMenu} loadingMessage={loadingMessage} progressInterval={loadingInterval} />}
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
            <ProteinModal/>
        </React.Fragment>
    );
};

export { AppUi };
