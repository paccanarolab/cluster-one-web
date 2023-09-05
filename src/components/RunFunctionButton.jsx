import React from 'react';
import "../styles/RunFunctionButton.scss"

const RunFunctionButton = ({ label, icon, onClickFunction, id, classname }) => {
    return (
        <button 
            className={classname} 
            onClick={() => onClickFunction(id)}
        >
        {label}
        {icon && <i className={icon}></i>}
        </button>
    );
}

export { RunFunctionButton };
