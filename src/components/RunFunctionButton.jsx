import React, { useState } from "react";
import "../styles/RunFunctionButton.scss";

const RunFunctionButton = ({ label, icon, onClickFunction, id, classname, message }) => {
    // Definir el estado para el hover
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
            className={classname}
            onClick={() => onClickFunction(id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className={"buttonLabel"}>{label}</span>
            {icon && <i className={icon}></i>}
            {isHovered && <a className={"buttonMessage"}>{message}</a>}
        </button>
    );
};

export { RunFunctionButton };
