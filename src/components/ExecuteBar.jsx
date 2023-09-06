import React from "react";
import { Layout } from "./Layout.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import { RunFunctionButton } from "./RunFunctionButton.jsx";


import "../styles/ExecuteBar.scss";

const ExecuteBar = ({ href, label }) => {
	return (
		<div className="config" id="config">
			<div
				style={{
					fontSize: "20px",
					marginBottom: "17px"
				}}>
				{/* Centrar el titulo */}
				<span
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}>
					ClusterONE WEB
				</span>
				{/*<p style={
                    {
                        fontSize: "18px",
                        marginBottom: "17px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }>Manipulation and Analysis clusters</p>*/}
			</div>
            <div>
                <p style={
                    {
                        fontSize: "18px",
                        marginBottom: "17px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }>Select Layout</p>
                <Layout classname="config-dropdown" />
            </div>
			
			<RunFunctionButton
				label="Quick Run ClusterONE"
				icon="fa fa-forward"
				onClickFunction={() => console.log("Quick Run ClusterONE")}
				classname={"runClusterOneButton"}
			/>
			<RunFunctionButton
				label="Run ClusterONE"
				icon="fa fa-play"
				onClickFunction={() => console.log("Run ClusterONE")}
				classname={"runClusterOneButton"}
			/>

			<RunFunctionButton
				label="Select our PPI"
				icon="fa fa-search"
				onClickFunction={() => console.log("Explore PPI")}
				classname={"explorePpiButton"}
			/>
			<RunFunctionButton
				label="Use your PPI"
				icon="fa fa-upload"
				onClickFunction={() => console.log("Explore PPI")}
				classname={"explorePpiButton"}
			/>
            <ClusterFilter />
			<a href={href} className="config-link">
				{label}
			</a>
		</div>
	);
};

export { ExecuteBar };
