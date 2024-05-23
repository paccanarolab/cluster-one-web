import React from "react";

const AppContext = React.createContext();

function AppContextProvider ({ children }) {
    // Constants and initial values
    const initiallayout = {
        name: 'cose',
        idealEdgeLength: function(edge){
            if(edge.data('source').type === 'proteinComplex' || edge.data('target').type === 'proteinComplex') {
                return 5300; // Aumenta este valor para dar más espacio entre los nodos proteinComplex
            }
            return 200; // o cualquier otro valor por defecto que desees.
        },
        // nodeOverlap: 4, 
        refresh: 20,
        fit: true,
        padding: 40,
        randomize: false,
        componentSpacing: 300,
        nodeRepulsion: 8000000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
        minNodeSpacing: 100,
        avoidOverlap: true,
    };

    const stylesheet = [
        {
            selector: "node[type='protein']",
            style: {
                backgroundColor: "#618CB3",
                width: 30,
                height: 30,
                label: "data(label)",
                "overlay-padding": "6px",
                "z-index": "10",
                //text props
                "text-outline-color": "#618CB3",
                "text-outline-width": "2px",
                color: "white",
                fontSize: 20
            }
        },
        {
            selector: "node[type='protein']:selected",
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
            selector: "node[type='proteinComplex']",
            style: {
                // shape: "rectangle",
                width: 120,
                height: 120,
                backgroundColor: "#B185B8",
                label: "data(label)",
                //text props
                "text-outline-color": "#B185B8",
                "text-outline-width": 8,
                color: "white",
                fontSize: 20
            }
        },
        {
            selector: "node[type='proteinComplex']:selected",
            style: {
                "border-width": "6px",
                "border-color": "#AAD8FF",
                "border-opacity": "0.5",
                "background-color": "#77828C",
                width: 180,
                height: 180,
                //text props
                "text-outline-color": "#77828C",
                "text-outline-width": 8
            }
        },
        {
            selector: "edge",
            style: {
                width: 2,
                "line-color": "#618CB3",
                "curve-style": "bezier",
                label: "",
            }
        },
        {
            selector: "edge[type='overlapping']",
            style: {
                width: 8,
                "line-color": "#B185B8",
                "curve-style": "bezier",
                label: "",
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
        label: "ClusterONE Command Line Manual"
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
    const [loadingMessage, setLoadingMessage] = React.useState("Loading..."); // Loading message
    const [openAboutModal, setOpenAboutModal] = React.useState(false); // About modal state
    const [showMenu, setShowMenu] = React.useState(true); // Show or hide menu
    
    // Protein Filter States
    const [complexProteinList, setComplexProteinList] = React.useState([initialProteinData]); // Protein List Uses in protein filter
    const [showComplexList, setShowComplexList] = React.useState(false); // Show or hide the cluster list
    const [ppiId, setPpiId] = React.useState("");
    const [ppiLabel, setPpiLabel] = React.useState(""); // PPI Label Uses in selected our ppi
    const [loading, setLoading] = React.useState(false); // Loading state
    const [showHighlight, setShowHighlight] = React.useState(false); // Highlight state
    const [showWeight, setShowWeight] = React.useState(false); // Highlight state
    const [openProteinInfo, setOpenProteinInfo] = React.useState(false); // Highlight state
    const [proteinInfo, setProteinInfo] = React.useState(""); // Highlight state

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
    const [modalOpen, setModalOpen] = React.useState(false);
    const [executionParams, setExecutionParams] = React.useState(""); // Execution params
    const [oraScore, setOraScore] = React.useState({
        bp_score: 0,
        mf_score: 0,
        cc_score: 0,
    }); // Execution params

    // Enrichment States
    const [enrichmentLoading, setEnrichmentLoading] = React.useState(true);
    const [enrichmentDataBase, setEnrichmentDataBase] = React.useState(false);
    const [goaFileName, setGoaFileName] = React.useState("");
    const [biologicalProcessDataset, setBiologicalProcessDataset] = React.useState([]);
    const [molecularFunctionDataset, setMolecularFunctionDataset] = React.useState([]);
    const [cellularComponentDataset, setCellularComponentDataset] = React.useState([]);

    // Clear functions
    const clearClusterFilter = () => {
        setComplexList(cyGraphList);
        setComplexCounter(cyGraphList.length);
    };
    
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }
    // Call API functions
    const uploadFilePpi = async (inputElement) => {
        // This function is called when the user uploads a file and charges it to the API
        // The API returns the id of the PPI and we save it in setPpiId state
        const file = inputElement.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch("https://paccanarolab.org/clusteroneweb/api/v1/api/graph/ppi/", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                setPpiId(data.id);
                setPpiLabel(data.name);
            } catch (error) {
                console.error("There was an error uploading the file:", error);
            }
        }
    };

    const uploadGoaFile = async (inputElement) => {
        // This function is called when the user uploads a file and charges it to the API
        // The API returns the id of the PPI and we save it in setPpiId state
        const file = inputElement.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch("https://paccanarolab.org/clusteroneweb/api/v1/api/enrichment/upload/goa/", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                console.log(data);
                setGoaFileName(data.goa_file);
            } catch (error) {
                console.error("There was an error uploading the file:", error);
            }
        }
    };


    const updateRedis = async (ppi_id) => {
        // This function is called when the user uploads a file and charges it to the API
        let ppi = ppiList.filter(
            (ppi) => {
                return ppi.id === ppi_id;
            }
        );
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/graph/ppi/preloaded/update/?file_name=${ppi[0].file_name}`, {
                method: 'POST'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }

    const quickRunClusterOne = async (ppi_id) => {
        // Uses the ppi_id state to call the API and get the clusters
        try {
            if ( goaFileName === "" ) {
                var baseUrl = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/run/?pp_id=${ppi_id}`;
            } else {
                var baseUrl = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/run/?pp_id=${ppi_id}&goa_file=${goaFileName}`
            }
            const response = await fetch(baseUrl, {
                method: 'POST'
            });
            let data = await response.json();
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
            setExecutionParams(data[0].params_id);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
            setLoading(false);
        }
    }

    const runClusterOneParams = async (ppi_id, params) => {
        // Uses the ppi_id state to call the API and get the clusters
        var minSizeValue = params.minSize;
        var baseUrl = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/run/?pp_id=${ppi_id}`;

        var minDensityValue = params.minDensity;
        var maxOverlapValue = params.maxOverlap;
        var penaltyValue = params.penalty;
        if ( goaFileName !== "" ) {
            var baseUrl = baseUrl + `&goa_file=${goaFileName}`;
        }
        
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
            let data = await response.json();
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
            setExecutionParams(data[0].params_id);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
            setLoading(false);
        }
    }
    
    const getAllPpi = async () => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/graph/ppi/all/`, {
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
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/protein/interactions/${clusterId}/?cluster_id=${clusterId}`, {
                method: 'GET'
            });
            const data = await response.json();
            return data.proteins;
        } catch (error) {
            console.error("There was an error fetching the data:", error);   
        }
    }

    const getProteinInfo = async (proteinLabel) => {
        // Get all information about all PPIs in the database
        try {
            const data = {data: `https://www.uniprot.org/uniprotkb/${proteinLabel}/`, protein: proteinLabel};
            setProteinInfo(data);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }

    const getEnrichmentData = async (clusterId) => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/enrichment/complex/${clusterId}/?cluster_id=${clusterId}`, {
                method: 'GET'
            });
            let data = await response.json();
            let biologicalProcessDataset = data.filter((item) => item.go_term.domain === 'BP');
            let molecularFunctionDataset = data.filter((item) => item.go_term.domain === 'MF');
            let cellularComponentDataset = data.filter((item) => item.go_term.domain === 'CC');
            let biologicalProcessDatasetParsed = biologicalProcessDataset.map(
                (item) => {
                    return {
                        go_id: item.go_term.go_id,
                        bar_charge: item.bar_charge,
                        term: item.go_term.term,
                    }
                }
            );

            let molecularFunctionDatasetParsed = molecularFunctionDataset.map(
                (item) => {
                    return {
                        go_id: item.go_term.go_id,
                        bar_charge: item.bar_charge,
                        term: item.go_term.term,
                    }
                }
            );
            let cellularComponentDatasetParsed = cellularComponentDataset.map(
                (item) => {
                    return {
                        go_id: item.go_term.go_id,
                        bar_charge: item.bar_charge,
                        term: item.go_term.term,
                    }
                }
            );
            setEnrichmentDataBase(true);
            if (biologicalProcessDatasetParsed.length === 0) {
                biologicalProcessDatasetParsed = [
                    {
                        go_id: "No data",
                        bar_charge: 0,
                        term: "No data",
                    }
                ];
            }
            if (molecularFunctionDatasetParsed.length === 0) {
                molecularFunctionDatasetParsed = [
                    {
                        go_id: "No data",
                        bar_charge: 0,
                        term: "No data",
                    }
                ];
            }
            if (cellularComponentDatasetParsed.length === 0) {
                cellularComponentDatasetParsed = [
                    {
                        go_id: "No data",
                        bar_charge: 0,
                        term: "No data",
                    }
                ];
            }
            setBiologicalProcessDataset(biologicalProcessDatasetParsed);
            setMolecularFunctionDataset(molecularFunctionDatasetParsed);
            setCellularComponentDataset(cellularComponentDatasetParsed);
            setEnrichmentLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
            let biologicalProcessDatasetParsed = [
                {
                    go_id: "No data",
                    bar_charge: 0,
                    term: "No data",
                }
            ];
            let molecularFunctionDatasetParsed = [
                {
                    go_id: "No data",
                    bar_charge: 0,
                    term: "No data",
                }
            ];
            let cellularComponentDatasetParsed = [
                {
                    go_id: "No data",
                    bar_charge: 0,
                    term: "No data",
                }
            ];
            setBiologicalProcessDataset(biologicalProcessDatasetParsed);
            setMolecularFunctionDataset(molecularFunctionDatasetParsed);
            setCellularComponentDataset(cellularComponentDatasetParsed);
            setEnrichmentDataBase(true);
            // setEnrichmentLoading(false);
        }
    }

    const getOraScore = async (executionId) => {
        // Get ORA Score by execution id
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/enrichment/params/?param_id=${executionId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setOraScore(data);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }


    // Use Effects
    React.useEffect(() => {
        if (cyGraph.code === "") {
            return;
        }
        let nodes = cyGraph.nodes;
        let proteins = [];
        nodes.forEach(
            (node) => {
                if (node.data.type === "protein") {
                    proteins.push({
                        id: node.data.id,
                        name: node.data.label,
                        description: "Automatic node created from PPI file",
                        url_info: `www.ebi.ac.uk/proteins/api/proteins/${node.data.label}`,
                    });
                }
            }
        );
        console.log("Proteins: ", proteins);
        setComplexProteinList(proteins);
        setShowComplexList(true);
    }, [cyGraph]);

    React.useEffect(() => {
        if (proteinId === "" || cyEvent === "") {
            return;
        }
        // get node by id 
        let node = cyEvent.nodes().filter(
            (node) => {
                return node.data().id === proteinId;
            }
        );
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
        getEnrichmentData(cyGraph.code)
        setShowWeight(false);
        setShowHighlight(false);
    }, [cyGraph]);

    React.useEffect(() => {
		if (complexCounter === 1) {
			setCyGraph(complexList[0]);
		}
	}, [complexCounter]);

    React.useEffect(() => {
        if (cyEvent === "") {
            return;
        }
        if (showHighlight) {
            let nodes = cyEvent.nodes()
            nodes.forEach((node) => {
                if (node.data().overlapping === true) {
                    node.style(
                        "background-color", "#C65151");
                    node.style(
                        "width", 50);
                    node.style(
                        "height", 50);
                    node.style(
                        "text-outline-color", "#C65151");
                    node.style(
                        "text-outline-width", 8);
                }
            });
        } else {
            let nodes = cyEvent.nodes()
            nodes.forEach((node) => {
                if (node.data().overlapping === true) {
                    node.style(
                        "background-color", "#618CB3");
                    node.style(
                        "width", 30);
                    node.style(
                        "height", 30);
                    node.style(
                        "text-outline-color", "#618CB3");
                    node.style(
                        "text-outline-width", 2);
                }
            });
        }
    }, [showHighlight]);

    React.useEffect(() => {
        if (cyEvent === "") {
            return;
        }
        if (showWeight) {
            // Change style of edges
            let edges = cyEvent.edges()
            edges.forEach((edge) => {
                edge.style(
                    "label", edge.data().label
                );
            });
        } else {
            // Change style of edges
            let edges = cyEvent.edges()
            edges.forEach((edge) => {
                edge.style(
                    "label", ""
                );
            });
        }
    }, [showWeight]);

    React.useEffect(() => {
        if (ppiId === "") {
            return;
        }
        let delayfromEp = 0;
        setCyGraphList([initialGraphData]);
        setComplexList([initialGraphData]);
        setComplexCounter(0);
        setCyGraph(initialGraphData);
        setComplexProteinList([initialProteinData]);
        setOraScore({
            bp_score: 0,
            mf_score: 0,
            cc_score: 0,
        });
        setLoadingMessage("Processing PPI.. Wait a moment please🧬");
        updateRedis(ppiId).then((data) => {
            try {
                var delayfromEp = data.size;
                console.log(data);
                if (data.size === 0) {
                    var delayfromEp = 60000;
                }
            } catch (error) {
                console.error(error);
                var delayfromEp = 60000;
            }
            setLoading(true);
            
            // Configura el temporizador para cambiar el estado después del tiempo especificado por delayfromEp
            const timer = setTimeout(() => {
                setLoading(false);
            }, delayfromEp);  
        
            // Limpia el temporizador si el componente se desmonta
            return () => {
                clearTimeout(timer);
            };
    
        }).catch(error => {
            console.error("Error al obtener datos:", error);
        });
    }, [ppiId]);

    React.useEffect(() => {
        if (goaFileName === "") {
            return;
        }
        setLoadingMessage("Processing Gene Ontology.. Wait a moment please🧬");
        var delayfromEp = 60000;
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, delayfromEp);  
        return () => {
            clearTimeout(timer);
        };
    }, [goaFileName]);



    React.useEffect(() => {
        if (executionParams === "") {
            return;
        }
        // let delayfromEp = 0;
        getOraScore(executionParams);
        console.log("ORA Score: ", oraScore);
    }, [executionParams]);


    
    return (
        <AppContext.Provider value={{
            stylesheet,
            paccaLabImage,
            fundacionImage,
            clusterOneManual,
            layout,
            ppiId,
            ppiLabel,
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
            modalOpen,
            enrichmentLoading,
            enrichmentDataBase,
            goaFileName,
            biologicalProcessDataset,
            molecularFunctionDataset,
            cellularComponentDataset,
            loadingMessage,
            oraScore,
            showMenu,
            clearClusterFilter,
            uploadFilePpi,
            uploadGoaFile,
            openProteinInfo,
            proteinInfo,
            openAboutModal,
            quickRunClusterOne,
            getProteinDataByCluster,
            setLayout,
            setPpiId,
            handleShowMenu,
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
            setModalOpen,
            setLoadingMessage,
            setPpiLabel,
            setShowWeight,
            setOpenProteinInfo,
            getProteinInfo,
            setProteinInfo,
            setOpenAboutModal,
            setEnrichmentLoading,
            getEnrichmentData,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };