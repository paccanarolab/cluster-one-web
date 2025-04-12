import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
        const downloadLink = document.createElement('a');
        downloadLink.href = pngDataUrl;
        downloadLink.download = `cl1_${organismName.substring(0, 20) + "..."}_${ppiLabel}_complex_${cyGraph.file_id}_graph.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
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
        <CameraAltIcon style={{ fontSize: '2.5rem' }} />
      </button>
    );
  };

export { DownloadGraph };
