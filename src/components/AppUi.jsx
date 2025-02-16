import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import { AppContext } from "./AppContext.jsx";
import { AboutModal } from "./AboutModal.jsx";
import { ClusterInfo } from "./ClusterInfo.jsx";
import { AllResultsClusterOne } from "./AllResultsClusterOne.jsx";
import { SearchByGoTerm } from "./SearchByGoTerm.jsx";
import { BackdropWithProgress } from "./BakdropWithProgress.jsx";
import { DownloadGraph } from "./DownloadGraph.jsx";
import { Instructions } from "./Instructions.jsx";
import "../styles/global.scss";
import "../styles/ClusterFilter.scss";


const AppUi = () => {
    const {
        layout, 
        stylesheet, 
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
            { 
                cyGraph.code &&
                <Instructions
                    left={"1.5%"}
                />
            }

            {/* Cytoscape graph */}
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    top: "58px",
                    left: "0px",
                    backgroundColor: "white"
                }}
            >
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
                                // Use a debounce with timestamp and flag to prevent multiple pop-ups
                                let lastClickTime = 0;
                                let isClickInProgress = false;

                                node.one("dblclick", function(evt) {
                                    const now = Date.now();
                                    
                                    // Check if a click is in progress or if the last click was recent (within 1 second)
                                    if (isClickInProgress || now - lastClickTime < 1000) {
                                        return;
                                    }

                                    // Mark click as in progress and update last click time
                                    isClickInProgress = true;
                                    lastClickTime = now;

                                    if (node.data('type') !== "proteinComplex") {
                                        window.open(`https://www.uniprot.org/uniprotkb/${node.data('id')}`, '_blank');
                                        console.log("Opening UniProt link");
                                    } else {
                                        const node_id = node.data('id');
                                        cyGraphList.forEach((graph) => {
                                            if (graph.code === node_id) {
                                                setCyGraph(graph);
                                                cy.elements('.highlighted').removeClass('highlighted');
                                            }
                                        });
                                    }

                                    // Reset click in progress after a short delay to allow new interactions
                                    setTimeout(() => {
                                        isClickInProgress = false;
                                    }, 1000); // Adjust this delay if needed
                                });
                            });

                            // Mouseover event
                            cy.on('mouseover', 'node', evt => {
                                const node = evt.target;
                                node.addClass('showlabel');
                            });
                            
                            // Mouseout event
                            cy.on('mouseout', 'node', evt => {
                                const node = evt.target;
                                node.removeClass('showlabel');
                            });
                        }
                    }
                />
            </div>
            {loading && <BackdropWithProgress loadingMessage={loadingMessage} progressInterval={loadingInterval} />}
            {cyGraph.code && <AllResultsClusterOne/>}
            {cyGraph.code && <SearchByGoTerm/>}
            <DownloadGraph cy={cyEvent} name={cyGraph.code}/>
            <DownloadButton />
            <AboutModal />
            <InfoButton />
        </React.Fragment>
    );
};

export { AppUi };
