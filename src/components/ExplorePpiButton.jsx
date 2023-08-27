import React from 'react';

const ExplorePpiButton = ({ label, icon, onClickFunction, id }) => {
    return (
        <button onClick={() => onClickFunction(id)}>
            {icon && <i className={icon}></i>}
            {label}
        </button>
    );
}

export default ExplorePpiButton;
