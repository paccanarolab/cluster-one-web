import React from 'react';
import "../styles/InfoButton.scss";

const InfoButton = ({ data }) => {
    const [showInfo, setShowInfo] = React.useState(false);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    }

    return (
        <div>
            <button 
                onClick={toggleInfo} 
                className={'cl1InfoButton'}>
            </button>
            
            {showInfo && (
                <div className="info-container">
                    <h3>{data.title}</h3>
                    <p>Página posterior: {data.backPage}</p>
                    <p>Página frontal: {data.frontPage}</p>
                    <p>{data.text}</p>
                    <div className="image-container">
                        {data.images.map((imgSrc, index) => (
                            <img key={index} src={imgSrc} alt="Info" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export { InfoButton };
