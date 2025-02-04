import React from 'react';
import { AppContext } from "./AppContext.jsx";
import "../styles/DownloadButton.scss";


const DownloadGraph = ({ cy, name}) => {
    const { 
        cyGraph,
        organismName,
        ppiLabel,
    } = React.useContext(AppContext);
    const handleDownload = () => {
      if (cy) {
        const pngDataUrl = cy.png({ full: true, scale: 8.3333, bg: 'white', maxWidth: 1920, maxHeight: 1080 });
  
        // Create a temporary link element
        const downloadLink = document.createElement('a');
        downloadLink.href = pngDataUrl;
        downloadLink.download = `cl1_${organismName.substring(0, 20) + "..."}_${ppiLabel}_complex_${cyGraph.file_id}_graph.png`;
  
        // Append the link to the body
        document.body.appendChild(downloadLink);
  
        // Programmatically click the link to trigger the download
        downloadLink.click();
  
        // Clean up and remove the link
        document.body.removeChild(downloadLink);
      } else {
        console.error('Cytoscape instance not found.');
      }
    };

    const isDisabled = cyGraph.code === "";
  
    return (
      <button 
        onClick={handleDownload} 
        className={`graphDownloadButton ${isDisabled ? 'disabled' : ''}`}
    >
        Download Complex Graph
      </button>
    );
  };

export { DownloadGraph };
