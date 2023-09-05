import React from 'react';
import "../styles/DownloadButton.scss";
const DownloadButton = ({ cluster_id }) => {

    const downloadFile = async () => {
        try {
            const response = await fetch(`YOUR_ENDPOINT_URL/${cluster_id}`, {
                method: 'GET'
            });
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'filename.csv';  // Puedes ajustar el nombre del archivo aquí
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("There was an error downloading the file:", error);
        }
    }

    return (
        <button 
            onClick={downloadFile} 
            className={'cl1DownloadButton'}
        >
        </button>
    );
}

export { DownloadButton };
