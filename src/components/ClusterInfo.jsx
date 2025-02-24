import React, { useState, useEffect }  from "react";
import { AppContext } from "./AppContext.jsx";
import { Enrichment } from "./Enrichment.jsx";
import "../styles/ClusterInfo.scss";

const ClusterInfo = () => {
	const {
		cyGraph,
		complexList,
		setCyGraph,
		goaFileName,
		executeBarHeight,
	} = React.useContext(AppContext);

	const [selectedClusterCode, setSelectedClusterCode] = useState("");
	const handleClusterCodeChange = (event) => {
		let clusterSelected = complexList.find((item) => item.code === event.target.value);
		setCyGraph(clusterSelected);
	};

	useEffect(() => {
		if (cyGraph && cyGraph.code) {
		  setSelectedClusterCode(cyGraph.code);
		}
	  }, [cyGraph]);
	
	return (	
		<div className="cluster-info-container">
			{cyGraph && (
				<ul className="cluster-info-list">
					<li><b>Complex:</b>{" #" + `${cyGraph.file_id}`}</li>
					<li><b>Size: </b>{cyGraph.size}</li>
					<li><b>Density: </b> {cyGraph.density}</li>
					<li><b>Cohesiveness: </b> {cyGraph.quality}</li>
				</ul>
			)}
			{(goaFileName !== "" && cyGraph.code) && <Enrichment/>}	
		</div>
	);
};

export { ClusterInfo };
