import React from 'react';

const LabImage = ({ image, url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={image} alt="Lab Image" />
        </a>
    );
}

export { LabImage };
