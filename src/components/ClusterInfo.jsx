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
					marginTop: "5px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px",
					flexDirection: "column"
				}}>
				{cyGraph && (
					<ul style={{ padding: "0", margin: "0", listStyleType: "none" }}>
						<li><b>Complex:</b>{" #" + `${cyGraph.file_id}`}</li>
						<li><b>Size: </b>{cyGraph.size}</li>
						<li><b>Density: </b> {cyGraph.density}</li>
						<li><b>Cohesiveness: </b> {cyGraph.quality}</li>
					</ul>
				)}
			</div>
			{(goaFileName !== "" && cyGraph.code) && <Enrichment/>}
			
		</div>
	);
};

export { ClusterInfo };
