import React from 'react';
import { AppContext } from "./AppContext.jsx";
import "../styles/DownloadButton.scss";


const DownloadButton = () => {
    const { 
        cyGraph,
        downloadCsvFile
    } = React.useContext(AppContext);
    
    const openLinkInNewTab = () => {
        const url = `https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/${cyGraph.code}/csv/?cluster_id=${cyGraph.code}`;
        window.open(url, '_blank');
    }

    const isDisabled = cyGraph.code === "";
    
    return (
        <button 
            onClick={openLinkInNewTab}
            className={`cl1DownloadButton ${isDisabled ? 'disabled' : ''}`}
            disabled={isDisabled}
        >
        ClusterONE Results CSV
        </button>
    );
}

export { DownloadButton };
