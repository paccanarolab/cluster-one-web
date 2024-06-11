import React  from "react";
import { AppContext } from "./AppContext.jsx";

const ClusterInfo = ({left, top}) => {
	const {
		cyGraph,
		complexList,
		setCyGraph,
	} = React.useContext(AppContext);
	const [selectedClusterCode, setSelectedClusterCode] = React.useState("");
	const handleClusterCodeChange = (event) => {
		setCyGraph(JSON.parse(event.target.value));
		setSelectedClusterCode(event.target.value);
	};
	
	React.useEffect(() => {
		setSelectedClusterCode(JSON.stringify(cyGraph));
	}, [cyGraph]);


	return (
		<div 
			style={{
				width: "10%",
				height: "10%",
				position: "fixed",
				top: top,
				left: left,
				zIndex: 1000,
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
						<option key={index} value={JSON.stringify(graphData)}>
							{graphData.code ? ("Complex #ID " + graphData.file_id + " (" + graphData.size + ")") : "NO COMPLEX"}
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
