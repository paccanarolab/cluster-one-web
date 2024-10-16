import React, { useState, useEffect }  from "react";
import { AppContext } from "./AppContext.jsx";
import { Enrichment } from "./Enrichment.jsx";
import { ClusterFilterButton } from "./ClusterFilterButton.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import zIndex from "@mui/material/styles/zIndex.js";

const ClusterInfo = ({left, top}) => {
	const {
		cyGraph,
		complexList,
		setCyGraph,
		goaFileName,
		showClusterFilter,
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
				padding: "10px",
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
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px",
					flexDirection: "column"
				}}>
				<ul style={{ padding: "0", margin: "0", listStyleType: "none" }}>
					<li>
						<b>* Double click on Complex: </b> you can go to the corresponding graph
					</li>
					<li>
						<b>* Double click on Protein: </b> open a new tab with the corresponding UniProt page
					</li>
					<li>
						<b>* Single click on Protein: </b> highlights the protein and its interactions
					</li>
					<li>
						<b>* Single click on Background: </b> Resets all edges and nodes
					</li>
				</ul>
			</div>
			{(goaFileName !== "" && cyGraph.code) && <Enrichment/>}
			{/* ClusterFilterButton */}
            {cyGraph.code && (
                <ClusterFilterButton  style={{zIndex: 1100, position: 'relative', marginBottom: "50px"}}
                />
            )}
            {
                showClusterFilter && 
                <ClusterFilter style={{zIndex: 1100, position: 'relative', marginBottom: "50px"}}   
                />
            }
		</div>
	);
};

export { ClusterInfo };
