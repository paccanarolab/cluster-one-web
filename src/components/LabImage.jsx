import React from 'react';
import "../styles/LabImage.scss";


const LabImage = ({ image, url, classname}) => {
    return (
        <a 
            href={url} 
            target="_blank" 
            className={classname}
            rel="noopener noreferrer">
            <img 
                src={image} 
                alt="Lab Image" 
                />
        </a>
    );
}

export { LabImage };
