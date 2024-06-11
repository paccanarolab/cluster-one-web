import React from 'react';
import { AppContext } from "./AppContext.jsx";
import "../styles/DownloadButton.scss";


const DownloadButton = () => {
    const { cyGraph, ppiId } = React.useContext(AppContext);
    const downloadFile = async () => {
        try {
            
            const response = await fetch(`https://paccanarolab.org/clusteroneweb/api/v1/api/cluster_one/${cyGraph.code}/csv/?cluster_id=${cyGraph.code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `clustersOne_results_by_ppi_${ppiId}.csv`;  // Puedes ajustar el nombre del archivo aquí
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("There was an error downloading the file:", error);
        }
    }

    const openLinkInNewTab = () => {
        const baseUrl = window.location.origin;
        const url = `${baseUrl}/clusteroneweb/api/v1/api/cluster_one/${cyGraph.code}/csv/?cluster_id=${cyGraph.code}`;
        window.open(url, '_blank');
    }

    const isDisabled = cyGraph.code === "";
    
    return (
        <button 
            onClick={!isDisabled ? openLinkInNewTab : null}
            className={`cl1DownloadButton ${isDisabled ? 'disabled' : ''}`}
            disabled={isDisabled}

        >
        </button>
    );
}

export { DownloadButton };
