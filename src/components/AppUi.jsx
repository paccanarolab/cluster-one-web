import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";
import { AboutModal } from "./AboutModal.jsx";
import { ClusterInfo } from "./ClusterInfo.jsx";
import { AllResultsClusterOne } from "./AllResultsClusterOne.jsx";
import { BackdropWithProgress } from "./BakdropWithProgress.jsx";
import { DownloadGraph } from "./DownloadGraph.jsx";
import "../styles/global.scss";
import "../styles/ClusterFilter.scss";

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const AppUi = () => {
    const {
        layout, 
        stylesheet, 
        paccaLabImage,
        fundacionImage,
        cyGraph,
        cyGraphList,
        loading,
        loadingMessage,
        loadingInterval,
        setCyEvent,
        cyEvent,
        setCyGraph,
        getAllOrganismsByDb,
    } = React.useContext(AppContext);

    React.useEffect(() => {
        getAllOrganismsByDb(-1);
    }, []);

    return (
        <React.Fragment>
            <ExecuteBar/>
            {
                cyGraph.code &&
                <ClusterInfo
                    top={"58px"}
                    left={"1.5%"}
                />
            }
            {/* LabImage 
            <LabImage 
                image={paccaLabImage.image}
                url={paccaLabImage.url}
                classname={paccaLabImage.classname}
            />*/}
            {/* Cytoscape graph */}
            <div
                style={{
                width: "100%",
                height: "100vh",
                position: "absolute",
                top: "58px",
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
                    zoom={0.3}
                    wheelSensitivity={0.1}
                    autounselectify={false}
                    boxSelectionEnabled={true}
                    layout={layout}
                    stylesheet={stylesheet}
                    cy={
                        cy => {
                            setCyEvent(cy);
                            cy.on('tap', function(evt) {
                                if (evt.target === cy) {
                                  console.log("Clicked on background");
                                  // Reset styles
                                  cy.elements('.highlighted').removeClass('highlighted');
                                }
                            });
                            cy.on("tap", "node", evt => {
                                var node = evt.target;
                                node.addClass('highlighted');
                                const connectedEdges = node.connectedEdges();
                                const connectedNodes = [];
                                // const connectedElements = node.closedNeighborhood();
                                // Get connected nodes
                                connectedEdges.forEach(edge => {
                                    const source = edge.source();
                                    const target = edge.target();
                                    
                                    // Avoid duplicates
                                    if (!connectedNodes.includes(source)) {
                                        connectedNodes.push(source);
                                    }
                                    if (!connectedNodes.includes(target)) {
                                        connectedNodes.push(target);
                                    }

                                    edge.addClass('highlighted');
                                });
                            
                                // Highlight connected nodes
                                connectedNodes.forEach(connectedNode => {
                                    connectedNode.addClass('highlighted');
                                });
                                node.on("dblclick", function(evt) {
                                    if (node.data('type') !== "proteinComplex") {
                                        window.open(`https://www.uniprot.org/uniprotkb/${node.data('label')}`, '_blank');
                                        // remove the existing listener
                                        console.log("Opening uniprot");
                                    } else {
                                        var node_id = node.data('id');
                                        cyGraphList.forEach((graph) => {
                                            if (graph.code === node_id) {
                                                setCyGraph(graph);
                                                cy.elements('.highlighted').removeClass('highlighted');
                                            }
                                        });
                                    }
                                });
                            });

                            // Mouseover event
                            cy.on('mouseover', 'node', evt => {
                                const node = evt.target;
                                const connectedElements = node.closedNeighborhood(); // Includes the node and its connected edges and nodes
                                connectedElements.addClass('showlabel');
                            });
                            
                            // Mouseout event
                            cy.on('mouseout', 'node', evt => {
                                const node = evt.target;
                                const connectedElements = node.closedNeighborhood();
                                connectedElements.removeClass('showlabel');
                            });
                        }
                    }
                />
            </div>
            {loading && <BackdropWithProgress loadingMessage={loadingMessage} progressInterval={loadingInterval} />}
            {cyGraph.code && <AllResultsClusterOne/>}
            <DownloadGraph cy={cyEvent} name={cyGraph.code}/>
            <DownloadButton />
            <AboutModal />
            <InfoButton />
        </React.Fragment>
    );
};

export { AppUi };
