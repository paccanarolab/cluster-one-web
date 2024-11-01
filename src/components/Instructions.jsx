import React from "react";

const Instructions = ({left}) => {
	return (
		<div 
			style={{
				width: "10%",
				height: "10%",
				position: "fixed",
				bottom: "23%",
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
					fontSize: "15px",
					flexDirection: "column",
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
			
		</div>
	);
};

export { Instructions };
