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
            selector: "edge",
            style: {
                width: 2,
                "line-color": "#AAD8FF",
                "curve-style": "bezier"
            }
        }
    ];
    
    const initialGraphData = {
        nodes: [], 
        edges: [],
        code: "",
        size: "",
        minDensity: "",
        minQuality: "",
        externalWeight: "",
        internalWeight: "",
        p_value: "",
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
        href: "https://paccanarolab.org/static_content/clusterone/cl1-cmdline-1.0.html",
        label: "ClusterONE Manual"
    };

    // Graph States
    const [complexList, setComplexList] = React.useState([initialGraphData]); // Cluster List
    const [complexCounter, setComplexCounter] = React.useState(0); // Cluster List
    const [cyGraphList, setCyGraphList] = React.useState([initialGraphData]); // Cluster List
    const [ppiList, setPpiList] = React.useState([]); // PPI List Uses in selected our ppi
    const [cyGraph, setCyGraph] = React.useState(initialGraphData); // Cluster List
    const [cyEvent, setCyEvent] = React.useState(""); // Cluster List
    const [proteinId, setProteinId] = React.useState("");
    const [layout, setLayout] = React.useState(initiallayout);
    
    // Protein Filter States
    const [complexProteinList, setComplexProteinList] = React.useState([initialProteinData]); // Protein List Uses in protein filter
    const [showComplexList, setShowComplexList] = React.useState(false); // Show or hide the cluster list
    const [ppiId, setPpiId] = React.useState("");
    const [loading, setLoading] = React.useState(false); // Loading state
    const [showHighlight, setShowHighlight] = React.useState(false); // Highlight state

    // Cluster Filter States
    const [minsize, setMinSize] = React.useState(0);
    const [maxsize, setMaxSize] = React.useState(100);
    const [minDensity, setMinDensity] = React.useState(0);
    const [maxDensity, setMaxDensity] = React.useState(1);
    const [minQuality, setMinQuality] = React.useState(0);
    const [maxQuality, setMaxQuality] = React.useState(1);
    const [size, setSize] = React.useState([minsize, maxsize]);
    const [density, setDensity] = React.useState("");
    const [quality, setQuality] = React.useState("");

    // Cluster One Execution Params
    const [clusterOneParams, setClusterOneParams] = React.useState({
        minSize: "",
        minDensity: "",
        maxOverlap: "",
        penalty: 2,
    });


    // Clear functions
    const clearClusterFilter = () => {
        setComplexList(cyGraphList);
        setComplexCounter(cyGraphList.length);
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
            let minSizeData = Math.min.apply(Math, data.map(function(o) { return o.size; }));
            let maxSizeData = Math.max.apply(Math, data.map(function(o) { return o.size; }));
            let minDensityData = Math.min.apply(Math, data.map(function(o) { return o.density; }));
            let maxDensityData = Math.max.apply(Math, data.map(function(o) { return o.density; }));
            let minQualityData = Math.min.apply(Math, data.map(function(o) { return o.quality; }));
            let maxQualityData = Math.max.apply(Math, data.map(function(o) { return o.quality; }));
            setMinSize(minSizeData);
            setMaxSize(maxSizeData);
            setMinDensity(minDensityData);
            setMaxDensity(maxDensityData);
            setMinQuality(minQualityData);
            setMaxQuality(maxQualityData);
            setComplexList(data);
            setCyGraphList(data);
            setComplexCounter(data.length);
            setCyGraph(data[0]);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
            setLoading(false);
        }
    }

    const runClusterOneParams = async (ppi_id, params) => {
        // Uses the ppi_id state to call the API and get the clusters
        var minSizeValue = params.minSize;
        var baseUrl = `http://localhost:8203/v1/api/cluster_one/run/?pp_id=${ppi_id}`;
        var minDensityValue = params.minDensity;
        var maxOverlapValue = params.maxOverlap;
        var penaltyValue = params.penalty;
        if (minSizeValue !== "") {
            var baseUrl = baseUrl + `&min_size=${minSizeValue}`;
        }
        if (minDensityValue !== "") {
            var baseUrl = baseUrl + `&min_density=${minDensityValue}`;
        }
        if (maxOverlapValue !== "") {
            var baseUrl = baseUrl + `&max_overlap=${maxOverlapValue}`;
        }
        if (penaltyValue !== "") {
            var baseUrl = baseUrl + `&penalty=${penaltyValue}`;
        }
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
            });
            const data = await response.json();
            let minSizeData = Math.min.apply(Math, data.map(function(o) { return o.size; }));
            let maxSizeData = Math.max.apply(Math, data.map(function(o) { return o.size; }));
            let minDensityData = Math.min.apply(Math, data.map(function(o) { return o.density; }));
            let maxDensityData = Math.max.apply(Math, data.map(function(o) { return o.density; }));
            let minQualityData = Math.min.apply(Math, data.map(function(o) { return o.quality; }));
            let maxQualityData = Math.max.apply(Math, data.map(function(o) { return o.quality; }));
            setMinSize(minSizeData);
            setMaxSize(maxSizeData);
            setMinDensity(minDensityData);
            setMaxDensity(maxDensityData);
            setMinQuality(minQualityData);
            setMaxQuality(maxQualityData);
            setComplexList(data);
            setCyGraphList(data);
            setComplexCounter(data.length);
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
        node[0].select();
    }, [proteinId]);

    React.useEffect(() => {
        if (cyGraph.code === "") {
            return;
        }
        setLayout(initiallayout);
    }, [cyGraph]);

    React.useEffect(() => {
		if (complexCounter === 1) {
			setCyGraph(complexList[0]);
		}
	}, [complexCounter]);

    React.useEffect(() => {
        console.log("Show Highlight: UseEffect", showHighlight);
        if (cyEvent === "") {
            return;
        }
        if (showHighlight) {
            let nodes = cyEvent.nodes()
            let node = nodes.forEach((node) => {
                if (node.data().overlapping === true) {
                    node.style(
                        "background-color", "#ff0000");
                    node.style(
                        "width", 50);
                    node.style(
                        "height", 50);
                    node.style(
                        "text-outline-color", "#ff0000");
                    node.style(
                        "text-outline-width", 8);
                }
            });
        } else {
            let nodes = cyEvent.nodes()
            let node = nodes.forEach((node) => {
                if (node.data().overlapping === true) {
                    node.style(
                        "background-color", "#4a56a6");
                    node.style(
                        "width", 30);
                    node.style(
                        "height", 30);
                    node.style(
                        "text-outline-color", "#4a56a6");
                    node.style(
                        "text-outline-width", 2);
                }
            });
        }
    }, [showHighlight]);

    return (
        <AppContext.Provider value={{
            stylesheet,
            paccaLabImage,
            fundacionImage,
            clusterOneManual,
            layout,
            ppiId,
            proteinId,
            cyGraph,
            cyEvent,
            loading,
            ppiList,
            complexList,
            complexProteinList,
            showComplexList,
            cyGraphList,
            minsize,
            maxsize,
            minDensity,
            maxDensity,
            minQuality,
            maxQuality,
            complexCounter,
            size,
            density,
            quality,
            clusterOneParams,
            clearClusterFilter,
            uploadFilePpi,
            quickRunClusterOne,
            getProteinDataByCluster,
            setLayout,
            setPpiId,
            getAllPpi,
            setCyGraph,
            setLoading,
            setProteinId,
            setCyEvent,
            setCyGraphList,
            setComplexList,
            setComplexCounter,
            setSize,
            setDensity,
            setQuality,
            setShowHighlight,
            setClusterOneParams,
            runClusterOneParams,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };