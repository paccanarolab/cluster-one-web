import React from "react";
import "../styles/RunFunctionButton.scss";

const RunFunctionButton = ({ label, icon, onClickFunction, id, classname }) => {
	return (
		<button
			style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
			className={classname}
			onClick={() => onClickFunction(id)}>
			{label}
			{icon && <i className={icon}></i>}
		</button>
	);
};

export { RunFunctionButton };
