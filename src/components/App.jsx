import React from "react";
import { ExecuteBar } from "./ExecuteBar.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import { InfoButton } from "./InfoButton.jsx";
import { LabImage } from "./LabImage.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import CytoscapeComponent from 'react-cytoscapejs'
import "../styles/global.scss"

const paccaLabImage = {
    image: "https://paccanarolab.org/wp-content/uploads/2023/02/Logo-v2.png",
    url: "https://www.paccanarolab.org/",
    classname: "labImage"
};

const fundacionImage = {
    image: "https://portal.fgv.br/sites/portal.fgv.br/themes/portalfgv/logo.png",
    url: "https://portal.fgv.br/en",
    classname: "fundacionImage"
};

const clusterOneManual = {
    href: "https://paccanarolab.org/clusterone/",
    label: "ClusterONE Manual"
};

const initialGraphData = {
    nodes: [], 
    edges: []
};

const exampleGraphData = {
    nodes: [
    { data: { id: "1", label: "IP 1", type: "ip" } },
    { data: { id: "2", label: "Device 1", type: "device" } },
    { data: { id: "3", label: "IP 2", type: "ip" } },
    { data: { id: "4", label: "Device 2", type: "device" } },
    { data: { id: "5", label: "Device 3", type: "device" } },
    { data: { id: "6", label: "IP 3", type: "ip" } },
    { data: { id: "7", label: "Device 5", type: "device" } },
    { data: { id: "8", label: "Device 6", type: "device" } },
    { data: { id: "9", label: "Device 7", type: "device" } },
    { data: { id: "10", label: "Device 8", type: "device" } },
    { data: { id: "11", label: "Device 9", type: "device" } },
    { data: { id: "12", label: "IP 3", type: "ip" } },
    { data: { id: "13", label: "Device 10", type: "device" }, position: { x: 100, y: 100 } },
    ],
    edges: [
    {
        data: { source: "1", target: "2", label: "Node2" }
    },
    {
        data: { source: "3", target: "4", label: "Node4" }
    },
    {
        data: { source: "3", target: "5", label: "Node5" }
    },
    {
        data: { source: "6", target: "5", label: " 6 -> 5" }
    },
    {
        data: { source: "6", target: "7", label: " 6 -> 7" }
    },
    {
        data: { source: "6", target: "8", label: " 6 -> 8" }
    },
    {
        data: { source: "6", target: "9", label: " 6 -> 9" }
    },
    {
        data: { source: "3", target: "13", label: " 3 -> 13" }
    }
    ]
};

const initiallayout = {
    name: "random",
    fit: true,
    // circle: true,
    directed: true,
    padding: 50,
    // spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false
};

const styleSheet = [
    {
        selector: "node",
        style: {
            backgroundColor: "#4a56a6",
            width: 30,
            height: 30,
            label: "data(label)",

            // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
            // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
            // "text-valign": "center",
            // "text-halign": "center",
            "overlay-padding": "6px",
            "z-index": "10",
            //text props
            "text-outline-color": "#4a56a6",
            "text-outline-width": "2px",
            color: "white",
            fontSize: 20
        }
    },
    {
        selector: "node:selected",
        style: {
            "border-width": "6px",
            "border-color": "#AAD8FF",
            "border-opacity": "0.5",
            "background-color": "#77828C",
            width: 50,
            height: 50,
            //text props
            "text-outline-color": "#77828C",
            "text-outline-width": 8
        }
    },
    {
        selector: "node[type='device']",
        style: {
            shape: "rectangle"
        }
    },
    {
        selector: "edge",
        style: {
            width: 3,
            // "line-color": "#6774cb",
            "line-color": "#AAD8FF",
            // "target-arrow-color": "#6774cb",
            // "target-arrow-shape": "triangle",
            "curve-style": "bezier"
        }
    }
];

// El metodo map() crea un nuevo array con los resultados de la llamada a la funcion indicada aplicados a cada uno de sus elementos.
const App = () => {
    const [width, setWith] = React.useState("100%");
    const [height, setHeight] = React.useState("760px");
    const [graphData, setGraphData] = React.useState(exampleGraphData);
    const [layout, setLayout] = React.useState(initiallayout);

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
                }}
            >
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
                />
            </div>
            
            <DownloadButton />
            <InfoButton />
            
        </React.Fragment>
    );
};

export default App;
