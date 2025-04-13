import React from 'react';
import { AppContext } from './AppContext';
import "../styles/InfoButton.scss";


const InstructionsBotton = () => {
    const {
        setOpenAboutModalInstruction,
    } = React.useContext(AppContext);

    const handleOpen = () => {
        setOpenAboutModalInstruction(true);
    };
    
    return (
            <button 
                onClick={handleOpen} 
                className={'quickHelpButton'}
            >
            Help
            </button>
    );

                }
export { InstructionsBotton };
