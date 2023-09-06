import React from "react";


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
    ],
    code: "COMPLEJO 1",
    size: 13,
    density: "2",
    quantity: 13,
    externalWeight: "5",
    internalWeight: "6"
};

const AppContext = React.createContext();

function AppContextProvider ({ children }) {
    // Constants and initial values
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
    
    const initialstyleSheet = [
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
    
    const initialGraphData = {
        nodes: [], 
        edges: [],
        code: "",
        size: "",
        density: "",
        quantity: "",
        externalWeight: "",
        internalWeight: ""
    };
    
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

    // States
    const [width, setWith] = React.useState("100%");
    const [height, setHeight] = React.useState("760px");
    const [graphList, setGraphList] = React.useState([initialGraphData, exampleGraphData]);
    const [layout, setLayout] = React.useState(initiallayout);
    const [stylesheet, setStylesheet] = React.useState(initialstyleSheet);
    const [size, setSize] = React.useState("");
    const [density, setDensity] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [externalWeight, setExternalWeight] = React.useState("");
    const [internalWeight, setInternalWeight] = React.useState("");
    const [ppiId, setPpiId] = React.useState("");
    const [proteinId, setProteinId] = React.useState("");
    const [ppiCodLocalStorage, setPpiCodLocalStorage] = React.useState("");

    // Clear functions
    const clearClusterFilter = () => {
        setSize("");
        setDensity("");
        setQuantity("");
        setExternalWeight("");
        setInternalWeight("");
    };

    const clearProteinFilter = () => {
        setProteinId("");
    };
    
    // Call API functions

    // Call LocalStorage functions


    return (
        <AppContext.Provider value={{
            width,
            height,
            graphList,
            layout,
            size,
            density,
            quantity,
            externalWeight,
            internalWeight,
            ppiId,
            proteinId,
            ppiCodLocalStorage,
            stylesheet,
            paccaLabImage,
            fundacionImage,
            clusterOneManual,
            setWith,
            setHeight,
            setGraphList,
            setLayout,
            setSize,
            setDensity,
            setQuantity,
            setExternalWeight,
            setInternalWeight,
            clearClusterFilter,
            setPpiId,
            setPpiCodLocalStorage,
            clearProteinFilter,
            setStylesheet,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };