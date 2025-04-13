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
import { InstructionsBotton } from "./InstructionsBotton.jsx";
import { InstructionsModal } from "./InstructionsModal.jsx";
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
                <ClusterInfo/>
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
                            cy.off("tap");
                            cy.off("tap", "node");
                            cy.off("mouseover", "node");
                            cy.off("mouseout", "node");
                            
                            cy.on('tap', function(evt) {
                                if (evt.target === cy) {
                                  console.log("Clicked on background");
                                  cy.elements('.highlighted').removeClass('highlighted');
                                }
                            });


                            let lastTapTime = 0;
                            let lastTapNodeId = null;

                            cy.on("tap", "node", evt => {
                                const node = evt.target;
                                const now = Date.now();

                                // Check if this tap qualifies as a double-tap on the same node
                                if (lastTapNodeId === node.id() && now - lastTapTime < 300) {
                                    // Double-tap detected
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
                                    // Reset so it doesn’t trigger again
                                    lastTapTime = 0;
                                    lastTapNodeId = null;
                                } else {
                                    // Not a double-tap; update last tap info
                                    lastTapTime = now;
                                    lastTapNodeId = node.id();
                                }
                                
                                node.addClass('highlighted');
                                node.connectedEdges().forEach(edge => {
                                    edge.addClass('highlighted');
                                    [edge.source(), edge.target()].forEach(connectedNode => {
                                    connectedNode.addClass('highlighted');
                                    });
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
            {/* <DownloadButton /> */}
            <AboutModal />
            <InstructionsModal />
            <InstructionsBotton />
            <InfoButton />
        </React.Fragment>
    );
};

export { AppUi };
