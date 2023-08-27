import React from 'react';

const DownloadButton = ({ label, icon, id }) => {

    const downloadFile = async () => {
        try {
            const response = await fetch(`YOUR_ENDPOINT_URL/${id}`, {
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
        <button onClick={downloadFile}>
            {icon && <i className={icon}></i>}
            {label}
        </button>
    );
}

export { DownloadButton };
