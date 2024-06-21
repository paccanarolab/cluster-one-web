import React from 'react';
import { AppContext } from "./AppContext.jsx";
import "../styles/DownloadButton.scss";


const DownloadButton = () => {
    const { 
        cyGraph,
        downloadCsvFile
    } = React.useContext(AppContext);
    
    const openLinkInCurrentTab = () => {
        const url = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/${cyGraph.code}/csv/?cluster_id=${cyGraph.code}`;
        window.location.href = url;
    }
    
    const handleDownload = () => {
        downloadCsvFile(cyGraph.code);
    }

    const isDisabled = cyGraph.code === "";
    
    return (
        <button 
            onClick={openLinkInCurrentTab}
            className={`cl1DownloadButton ${isDisabled ? 'disabled' : ''}`}
            disabled={isDisabled}
        >
        </button>
    );
}

export { DownloadButton };
