import React, { useState, useEffect }  from "react";
import { AppContext } from "./AppContext.jsx";

const ClusterInfo = ({left, top}) => {
	const {
		cyGraph,
		complexList,
		setCyGraph,
	} = React.useContext(AppContext);
	const [selectedClusterCode, setSelectedClusterCode] = useState("");
	const handleClusterCodeChange = (event) => {
		console.log("Handle change", event.target.value); // Now i have the code of the selected cluster
		// I need to find the cluster in the complexList
		// I need to set the cyGraph
		let clusterSelected = complexList.find((item) => item.code === event.target.value);
		setCyGraph(clusterSelected);
	};

	useEffect(() => {
		if (cyGraph && cyGraph.code) {
		  setSelectedClusterCode(cyGraph.code);
		}
	  }, [cyGraph]);
	
	return (
		<div 
			style={{
				width: "10%",
				height: "10%",
				position: "fixed",
				top: top,
				left: left,
				zIndex: 10,
				alignItems: "left",
			}}
		>
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px"
				}}>
				Selected Complex Data: 
			</div>
			<select
					value={selectedClusterCode}
					onChange={handleClusterCodeChange}
					style={{ marginBottom: "15px", width: "90%" }}
					className="config-dropdown"
				>
				{
					complexList.map((graphData, index) => (
						<option key={index} value={graphData.code}>
							{
								graphData.code ? 
								("Complex #" + graphData.file_id + " (" + graphData.size + ")") 
								: "NO COMPLEX"
							}
						</option>
					))
				}
			</select>
			<div
				style={{
					display: "flex",
					marginTop: "5px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px",
					flexDirection: "column"
				}}>
				{cyGraph && (
					<ul style={{ padding: "0", margin: "0", listStyleType: "none" }}>
						<li>Size: {cyGraph.size}</li>
						<li>Density: {cyGraph.density}</li>
						<li>Cohesiveness: {cyGraph.quality}</li>
						{/* Añade aquí cualquier otra propiedad de cyGraph que quieras mostrar */}
					</ul>
				)}
			</div>
		</div>
	);
};

export { ClusterInfo };
