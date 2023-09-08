import React from "react";
import "../styles/ClusterFilter.scss";
import { AppContext } from "./AppContext.jsx";

const ClusterFilter = () => {
	const {
		complexList,
		cyGraphList,
        clearClusterFilter,
		setComplexList,
		setCyGraph,
		minsize,
		maxsize,
		minDensity,
		maxDensity,
		minQuality,
		maxQuality,
		minExternalWeight,
		maxExternalWeight,
		minInternalWeight,
		maxInternalWeight,
	} = React.useContext(AppContext);

	
	// Tengo que ver la forma de persistir la lista de grafos
	const handleClusterCodeChange = (event) => {
		setCyGraph(JSON.parse(event.target.value));
	};

	const handleSignificancePvalueChange = (event) => {
		var valuePvalue = event.target.value;
		if (valuePvalue === "p > 0.05") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value > 0.05) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				console.log("No hay grafos con p-value > 0.05");
				setComplexList(cyGraphList);
			}else{
				console.log("Hay grafos con p-value > 0.05");
				setComplexList(auxfilter);
			}
		} else if (valuePvalue === "p <= 0.05") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value <= 0.05) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				console.log("No hay grafos con p-value <= 0.05");
				setComplexList(cyGraphList);
			}else{
				console.log("Hay grafos con p-value <= 0.05");
				setComplexList(auxfilter);
			}
		} else if (valuePvalue === "p <= 0.01") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value <= 0.01) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				console.log("No hay grafos con p-value <= 0.01");
				setComplexList(cyGraphList);
			}else{
				console.log("Hay grafos con p-value <= 0.01");
				setComplexList(auxfilter);
			}
		}
		else if (valuePvalue === "p <= 0.001") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value <= 0.001) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				console.log("No hay grafos con p-value <= 0.001");
				setComplexList(cyGraphList);
			}else{
				console.log("Hay grafos con p-value <= 0.001");
				console.log(auxfilter);
				setComplexList(auxfilter);
			}
		}

	};


	return (
		<div className="complex" id="cfilter">
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "center",
					fontSize: "20px"
				}}>
				Complex Filter
			</div>
			<select
				onChange={handleClusterCodeChange}
				style={{ marginBottom: "15px", width: "100%" }}
				className="config-dropdown"
			>
				{complexList.map((graphData, index) => (
					<option key={index} value={JSON.stringify(graphData)}>
						{graphData.code ? ("COMPLEX - " + graphData.code) : "NO COMPLEX"}
					</option>
				))}
			</select>
			<select
				style={{ marginBottom: "15px", width: "100%" }}
				className="config-dropdown"
				onChange={handleSignificancePvalueChange}
			>	
				<option value="clear">All p-values</option>
				<option value="p > 0.05">Not significant p-value</option>
				<option value="p <= 0.05">Significant p-value</option>
				<option value="p <= 0.01">Very significant p-value</option>
				<option value="p <= 0.001">Highly significant p-value</option>
			</select>

			

			

			<button
				style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
				onClick={clearClusterFilter}>
				Clear
			</button>
		</div>
	);
};

export { ClusterFilter };
