import React from 'react';
import { AppContext } from './AppContext';
import "../styles/InfoButton.scss";


const InfoButton = () => {
    const {
        setOpenAboutModal,
    } = React.useContext(AppContext);

    const handleOpen = () => {
        setOpenAboutModal(true);
    };
    
    return (
            <button 
                onClick={handleOpen} 
                className={'cl1InfoButton'}
            >
            About
            </button>
    );

                }
export { InfoButton };
