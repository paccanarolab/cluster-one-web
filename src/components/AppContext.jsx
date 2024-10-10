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
                backgroundColor: "#debc6e",
                "border-color": "#252525",
                "border-width": "3px",
                width: 30,
                height: 30,
                label: "",
                "overlay-padding": "6px",
                "z-index": "10",
            }
        },
        {
            selector: "node[type='protein']:selected",
            style: {
                "border-width": "6px",
                label: "data(label)",
                "border-color": "#252525",
                "border-opacity": "0.5",
                "background-color": "#b2800f",
                width: 50,
                height: 50,
            }
        },
        {
            selector: "node[type='proteinComplex']",
            style: {
                shape: "rectangle",
                width: 30,
                height: 30,
                backgroundColor: "#B185B8",
                //text props
                color: "black",
                fontSize: 20,
            }
        },
        {
            selector: '.showlabel',
            style: {
              'label': 'data(label)', // Show labels when highlighted
            },
        },
        {
            selector: "node[type='proteinComplex']:selected",
            style: {
                "border-color": "#252525",
                "border-opacity": "0.5",
                "background-color": "#B185B8",
                width: 50,
                height: 50,
                label: "data(label)",
            }
        },
         // Default edge style
        {
            selector: 'edge',
            style: {
            width: 2,
            'line-color': '#debc6e',
            'curve-style': 'bezier',
            label: '',
            },
        },
        // Selected edge style
        {
            selector: 'edge:selected',
            style: {
            width: 2,
            'line-color': '#debc6e',
            'curve-style': 'bezier',
            label: 'data(label)',
            },
        },
        // Overlapping edge style
        {
            selector: "edge[type='overlapping']",
            style: {
            width: 2,
            'line-color': '#B185B8',
            'curve-style': 'bezier',
            label: '',
            'line-style': 'dashed',
            },
        },
        // Styles for highlighted nodes
        {
            selector: 'node.highlighted',
            style: {
            'background-color': '#C65151',
            'label': 'data(label)',
            },
        },
        // Styles for highlighted edges
        {
            selector: 'edge.highlighted',
            style: {
                'line-color': '#C65151',
                width: 3,
                'label': 'data(label)',
                'text-outline-color': '#C65151',
                'text-outline-width': 2,
                color: '#fff',
                'z-index': 9999, // Ensure highlighted edges appear above others
            },
        },
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
    const [dbList, setDbList] = React.useState([]); // PPI List Uses in selected our ppi
    const [organismList, setOrganismList] = React.useState([]); // PPI List Uses in selected our ppi
    const [organismName, setOrganismName] = React.useState("")
    const [cyGraph, setCyGraph] = React.useState(initialGraphData); // Cluster List
    const [cyEvent, setCyEvent] = React.useState(""); // Cluster List
    const [proteinId, setProteinId] = React.useState("");
    const [layout, setLayout] = React.useState(initiallayout);
    const [loadingMessage, setLoadingMessage] = React.useState("Loading..."); // Loading message
    const [openAboutModal, setOpenAboutModal] = React.useState(false); // About modal state
    const [showMenu, setShowMenu] = React.useState(true); // Show or hide menu
    const [showPPILoadedMessage, setShowPPILoadedMessage] = React.useState(false); // Show or hide menu
    const [isPpiWeighted, setIsPpiWeighted] = React.useState(false);
    
    // Protein Filter States
    const [complexProteinList, setComplexProteinList] = React.useState([initialProteinData]); // Protein List Uses in protein filter
    const [showComplexList, setShowComplexList] = React.useState(false); // Show or hide the cluster list
    const [ppiId, setPpiId] = React.useState("");
    const [ppiLabel, setPpiLabel] = React.useState(""); // PPI Label Uses in selected our ppi
    const [loading, setLoading] = React.useState(false); // Loading state
    const [loadingInterval, setLoadingInterval] = React.useState(0); // Loading interval
    const [loadingIntervalClusterOne, setLoadingIntervalClusterOne] = React.useState(0); // Loading interval
    
    const [showHighlight, setShowHighlightState] = React.useState(false); // Highlight state
    const setShowHighlight = (value, callback) => {
        setShowHighlightState(value, () => {
            callback?.();
        });
    };

    const [showWeight, setShowWeightState] = React.useState(false); // Highlight state
    const setShowWeight = (value, callback) => {
        setShowWeightState(value, () => {
            callback?.();
        });
    };

    const [openProteinInfo, setOpenProteinInfo] = React.useState(false); // Highlight state
    const [proteinInfo, setProteinInfo] = React.useState(""); // Highlight state

    // Cluster Filter States
    const [showClusterFilter, setShowClusterFilter] = React.useState(false);
    const [minsize, setMinSize] = React.useState(0);
    const [maxsize, setMaxSize] = React.useState(100);
    const [minDensity, setMinDensity] = React.useState(0);
    const [maxDensity, setMaxDensity] = React.useState(1);
    const [minQuality, setMinQuality] = React.useState(0);
    const [maxQuality, setMaxQuality] = React.useState(1);
    const [size, setSize] = React.useState([minsize, maxsize]);
    const [density, setDensity] = React.useState("");
    const [quality, setQuality] = React.useState("");
    const [openResults, setOpenResults] = React.useState(false);
    const [filterModel, setFilterModel] = React.useState({});

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
    });

    // Enrichment States
    const [enrichmentLoading, setEnrichmentLoading] = React.useState(true);
    const [enrichmentDataBase, setEnrichmentDataBase] = React.useState(false);
    const [openEnrichment, setOpenEnrichment] = React.useState(false);
    const [goaFileName, setGoaFileName] = React.useState("");
    const [biologicalProcessDataset, setBiologicalProcessDataset] = React.useState([]);
    const [molecularFunctionDataset, setMolecularFunctionDataset] = React.useState([]);
    const [cellularComponentDataset, setCellularComponentDataset] = React.useState([]);

    // Clear functions
    const clearClusterFilter = () => {
        setComplexList(cyGraphList);
        setComplexCounter(cyGraphList.length);
        setCyGraph(cyGraphList[0]);
    };
    
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleShowClusterFilter = () => {
        setShowClusterFilter(!showClusterFilter);
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
                try {
                    var delayfromEp = data.size / 20;
                    // console.log(data);
                    if (data.size === 0) {
                        var delayfromEp = 60000;
                        setLoadingInterval(delayfromEp);
                        setLoadingIntervalClusterOne(60000 * 3);
                    } else {
                        setLoadingInterval(delayfromEp);
                        if (data.size < 100) {
                            setLoadingIntervalClusterOne(data.size * 20);
                        } else if (data.size < 4000) {
                            setLoadingIntervalClusterOne(data.size * 20);
                        } else if (data.size < 10000) {
                            setLoadingIntervalClusterOne(data.size * 7);
                        } else if (data.size < 10000) {
                            setLoadingIntervalClusterOne(data.size * 5);
                        } else if (data.size < 100000) {
                            setLoadingIntervalClusterOne(data.size * 3);
                        } else {
                            setLoadingIntervalClusterOne(data.size);
                        }
                    }
                } catch (error) {
                    console.error(error);
                    var delayfromEp = 60000;
                    setLoadingInterval(delayfromEp);
                    setLoadingIntervalClusterOne(60000 * 3);
                }    
                setLoadingMessage("Processing PPI.. Wait a moment please, the time depends on PPI size. You can go for a coffee 🧬☕️");
                setIsPpiWeighted(data.weighted);
                setLoading(true);
                
                // Configura el temporizador para cambiar el estado después del tiempo especificado por delayfromEp
                const timer = setTimeout(() => {
                    setLoading(false);
                    setShowPPILoadedMessage(true);
                }, delayfromEp);  
            
                // Limpia el temporizador si el componente se desmonta
                return () => {
                    clearTimeout(timer);
                };
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

    const quickRunClusterOne = async (ppi_id, timeout = 800000) => {
        // Uses the ppi_id state to call the API and get the clusters
        try {
            let baseUrl = '';
            if (goaFileName === "") {
                baseUrl = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/run/?pp_id=${ppi_id}`;
            } else {
                baseUrl = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/run/?pp_id=${ppi_id}&goa_file=${goaFileName}`;
            }
    
            // Function to handle fetch with timeout
            const fetchWithTimeout = (resource, options) => {
                const fetchPromise = fetch(resource, options);
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Request timed out')), timeout);
                });
    
                return Promise.race([fetchPromise, timeoutPromise]);
            };
    
            const response = await fetchWithTimeout(baseUrl, { method: 'POST' });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            let data = await response.json();
    
            let minSizeData = Math.min.apply(Math, data.map(function (o) { return o.size; }));
            let maxSizeData = Math.max.apply(Math, data.map(function (o) { return o.size; }));
            let minDensityData = Math.min.apply(Math, data.map(function (o) { return o.density; }));
            let maxDensityData = Math.max.apply(Math, data.map(function (o) { return o.density; }));
            let minQualityData = Math.min.apply(Math, data.map(function (o) { return o.quality; }));
            let maxQualityData = Math.max.apply(Math, data.map(function (o) { return o.quality; }));
    
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
            window.alert(`There was an error fetching the data: ${error.message}`);
            setLoading(false);
        }
    };


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
    
    const downloadCsvFile = async (clusterId) => {
        try {
            const url = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/${clusterId}/csv/?cluster_id=${clusterId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/csv'
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            a.download = `cluster_${clusterId}.csv`;  // Specify the file name here
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            a.remove(); // Clean up
        } catch (error) {
            console.error("There was an error downloading the file:", error);
        }
    }
    

    const getAllDatabases = async () => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/graph/databases/all/`, {
                method: 'GET'
            });
            
            const data = await response.json();
            setDbList(data);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }

    const getAllOrganismsByDb = async (db_id) => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/graph/organisms/db/?db_id=${db_id}`, {
                method: 'GET'
            });

            const data = await response.json();
            setOrganismList(data);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
        }
    }

    const getPpiByOrganismAndDb = async (organism_id, database_id) => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/graph/ppi/organism/all/?organism_id=${organism_id}&database_id=${database_id}`, {
                method: 'GET'
            });

            const data = await response.json();
            setPpiList(data);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
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

    const getEnrichmentData = async (clusterId) => {
        // Get all information about all PPIs in the database
        try {
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/enrichment/complex/${clusterId}/?cluster_id=${clusterId}`, {
                method: 'GET'
            });
            let data = await response.json();
            let _biologicalProcessDataset = data.filter((item) => item.go_term.domain === 'BP');
            let _molecularFunctionDataset = data.filter((item) => item.go_term.domain === 'MF');
            let _cellularComponentDataset = data.filter((item) => item.go_term.domain === 'CC');

            // Sort the data
            // .slice().sort((a, b) => b.bar_charge - a.bar_charge)
            let biologicalProcessDataset = _biologicalProcessDataset.sort((a, b) => b.bar_charge - a.bar_charge);
            let molecularFunctionDataset = _molecularFunctionDataset.sort((a, b) => b.bar_charge - a.bar_charge);
            let cellularComponentDataset = _cellularComponentDataset.sort((a, b) => b.bar_charge - a.bar_charge);
            
            let biologicalProcessDatasetParsed = biologicalProcessDataset.map(
                (item) => {
                    return {
                        go_id: item.go_term.go_id,
                        term: item.go_term.term,
                        bar_charge: item.bar_charge,
                    }
                }
            );
            let molecularFunctionDatasetParsed = molecularFunctionDataset.map(
                (item) => {
                    return {
                        go_id: item.go_term.go_id,
                        term: item.go_term.term,
                        bar_charge: item.bar_charge,
                    }
                }
            );
            let cellularComponentDatasetParsed = cellularComponentDataset.map(
                (item) => {
                    return {
                        go_id: item.go_term.go_id,
                        term: item.go_term.term,
                        bar_charge: item.bar_charge,
                    }
                }
            );
            setEnrichmentDataBase(true);
            if (biologicalProcessDatasetParsed.length === 0) {
                biologicalProcessDatasetParsed = [
                    {
                        go_id: "No overrepresented terms",
                        bar_charge: 0,
                    }
                ];
            }
            if (molecularFunctionDatasetParsed.length === 0) {
                molecularFunctionDatasetParsed = [
                    {
                        go_id: "No overrepresented terms",
                        bar_charge: 0,
                    }
                ];
            }
            if (cellularComponentDatasetParsed.length === 0) {
                cellularComponentDatasetParsed = [
                    {
                        go_id: "No overrepresented terms",
                        bar_charge: 0,
                    }
                ];
            }
            setBiologicalProcessDataset(biologicalProcessDatasetParsed.slice(0, 20));
            setMolecularFunctionDataset(molecularFunctionDatasetParsed.slice(0, 20));
            setCellularComponentDataset(cellularComponentDatasetParsed.slice(0, 20));
            setEnrichmentLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data:", error);
            setEnrichmentLoading(false);
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
        setShowWeight(false);
        setShowHighlight(false);
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
        setComplexProteinList(proteins);
        setShowComplexList(true);
        setLayout(initiallayout);
        if (goaFileName !== "") {
            getEnrichmentData(cyGraph.code)
        }
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
        cyEvent.nodes().unselect();
        node[0].select();
    }, [proteinId]);

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
                        "background-color", "#800080");
                    node.style(
                        "width", 50);
                    node.style(
                        "height", 50);
                }
            });
        } else {
            let nodes = cyEvent.nodes()
            nodes.forEach((node) => {
                if (node.data().overlapping === true) {
                    node.style(
                        "background-color", "#debc6e");
                    node.style(
                        "width", 30);
                    node.style(
                        "height", 30);
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
        setLoadingMessage("Processing PPI.. Wait a moment please, the time depends on PPI size. You can go for a coffee 🧬☕️");
        updateRedis(ppiId).then((data) => {
            try {
                var delayfromEp = data.size / 20;
                // console.log(data);
                if (data.size === 0) {
                    var delayfromEp = 60000;
                    setLoadingInterval(delayfromEp);
                    setLoadingIntervalClusterOne(60000 * 3);
                } else {
                    setLoadingInterval(delayfromEp);
                    if (data.size < 100) {
                        setLoadingIntervalClusterOne(data.size * 20);
                    } else if (data.size < 1000) {
                        setLoadingIntervalClusterOne(data.size * 20);
                    } else if( data.size < 4000) {
                        setLoadingIntervalClusterOne(data.size * 7);
                    }
                    else if (data.size < 10000) {
                        setLoadingIntervalClusterOne(data.size * 5);
                    } else if (data.size < 100000) {
                        setLoadingIntervalClusterOne(data.size * 3);
                    } else {
                        setLoadingIntervalClusterOne(data.size);
                    }
                }
            } catch (error) {
                console.error(error);
                var delayfromEp = 60000;
                setLoadingInterval(delayfromEp);
                setLoadingIntervalClusterOne(60000 * 3);
            } 
            setLoading(true);
            
            // Configura el temporizador para cambiar el estado después del tiempo especificado por delayfromEp
            const timer = setTimeout(() => {
                setLoading(false);
                setShowPPILoadedMessage(true);
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
    }, [executionParams]);

    React.useEffect(() => {
        if (showPPILoadedMessage === false) {
            return;
        }
        var delayfromEp = 6000;
        const timer = setTimeout(() => {
            setShowPPILoadedMessage(false);
        }, delayfromEp);  
        return () => {
            clearTimeout(timer);
        };
    }, [showPPILoadedMessage]);
    
    React.useEffect(() => {
        if (loading === false) {
            return;
        }
        setShowPPILoadedMessage(false);
    }, [loading]);

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
            loadingInterval,
            setLoadingInterval,
            cyGraphList,
            minsize,
            loadingIntervalClusterOne,
            maxsize,
            minDensity,
            maxDensity,
            minQuality,
            maxQuality,
            complexCounter,
            isPpiWeighted,
            size,
            organismName,
            setOrganismName,
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
            openEnrichment,
            setOpenEnrichment,
            dbList,
            organismList,
            showMenu,
            showClusterFilter,
            showPPILoadedMessage,
            clearClusterFilter,
            handleShowClusterFilter,
            uploadFilePpi,
            uploadGoaFile,
            openProteinInfo,
            proteinInfo,
            openAboutModal,
            quickRunClusterOne,
            setLayout,
            setPpiId,
            handleShowMenu,
            getAllPpi,
            getAllOrganismsByDb,
            setOrganismList,
            getAllDatabases,
            getPpiByOrganismAndDb,
            setCyGraph,
            setLoading,
            openResults,
            setOpenResults,
            filterModel,
            setFilterModel,
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
            setProteinInfo,
            setOpenAboutModal,
            setEnrichmentLoading,
            getEnrichmentData,
            setIsPpiWeighted,
            downloadCsvFile,
            setMinSize,
            setMaxSize,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };