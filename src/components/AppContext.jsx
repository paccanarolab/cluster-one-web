import React from "react";

const AppContext = React.createContext();

function AppContextProvider ({ children }) {
    // Constants and initial values
    const initiallayout = {
        name: "circle",
        fit: true,
        padding: 30,
        sort: function(a, b){ return a.degree() - b.degree(); },
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    };
    
    const stylesheet = [
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
    const initialProteinData = {
        id: 32,
        name: "YIR010W",
        description: "Automatic node created from PPI file",
        url_info: "www.ebi.ac.uk/proteins/api/proteins/YIR010W",
        score: 0.0
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
    const [complexList, setComplexList] = React.useState([initialGraphData]); // Cluster List
    const [ppiList, setPpiList] = React.useState([]); // PPI List Uses in selected our ppi
    const [complexProteinList, setComplexProteinList] = React.useState([initialProteinData]); // Protein List Uses in protein filter
    const [showComplexList, setShowComplexList] = React.useState(false); // Show or hide the cluster list
    const [cyGraph, setCyGraph] = React.useState(initialGraphData); // Cluster List
    const [cyEvent, setCyEvent] = React.useState(""); // Cluster List
    const [ppiId, setPpiId] = React.useState("");
    const [proteinId, setProteinId] = React.useState("");
    const [layout, setLayout] = React.useState(initiallayout);
    const [loading, setLoading] = React.useState(false); // Loading state
    const [size, setSize] = React.useState("");
    const [density, setDensity] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [externalWeight, setExternalWeight] = React.useState("");
    const [internalWeight, setInternalWeight] = React.useState("");
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
    const uploadFilePpi = async (inputElement) => {
        // This function is called when the user uploads a file and charges it to the API
        // The API returns the id of the PPI and we save it in setPpiId state
        const file = inputElement.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch("http://localhost:8203/v1/api/graph/ppi/", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                setPpiId(data.id); // esto guardaremos en el local storage
            } catch (error) {
                console.error("There was an error uploading the file:", error);
            }
        }
    };

    const quickRunClusterOne = async (ppi_id) => {
        // Uses the ppi_id state to call the API and get the clusters
        try {
            const response = await fetch(`http://localhost:8203/v1/api/cluster_one/run/?pp_id=${ppi_id}`, {
                method: 'POST'
            });
            const data = await response.json();
            setComplexList(data);
            setCyGraph(data[0]);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
            setLoading(false);
        }
    }
    
    const getAllPpi = async () => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`http://localhost:8203/v1/api/graph/ppi/all/`, {
                method: 'GET'
            });
            
            const data = await response.json();
            setPpiList(data);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }
      
    const getProteinDataByCluster = async (clusterId) => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`http://localhost:8203/v1/api/protein/interactions/${clusterId}/?cluster_id=${clusterId}`, {
                method: 'GET'
            });

            const data = await response.json();
            return data.proteins;
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }


    // Use Effects
    React.useEffect(() => {
        if (cyGraph.code === "") {
            return;
        }
        getProteinDataByCluster(cyGraph.code).then(
            (data) => {
                setComplexProteinList(data);
                console.log("Protein List: ", data);
            }
        );
        setShowComplexList(true);
    }, [cyGraph]);
    
    React.useEffect(() => {
        if (proteinId === "" || cyEvent === "") {
            return;
        }
        console.log("Protein ID: ", proteinId);
        // get node by id 
        let node = cyEvent.nodes().filter(
            (node) => {
                return node.data().id === proteinId;
            }
        );
        console.log("Node: ", node);
        cyEvent.zoom({
            level: 2,
            position: { x: node[0].position().x, y: node[0].position().y }
        });
        cyEvent.center(node[0]);
    }, [proteinId]);


    return (
        <AppContext.Provider value={{
            width,
            height,
            cyGraph,
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
            ppiList,
            complexList,
            loading,
            complexProteinList,
            showComplexList,
            cyEvent,
            setWith,
            setHeight,
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
            uploadFilePpi,
            quickRunClusterOne,
            getAllPpi,
            getProteinDataByCluster,
            setCyGraph,
            setLoading,
            setProteinId,
            setCyEvent,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };