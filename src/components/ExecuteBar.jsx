import React from "react";
import { Layout } from "./Layout.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import { RunFunctionButton } from "./RunFunctionButton.jsx";
import { ClusterOneParams } from "./ClusterOneParams.jsx";
import {SelectPPiOptions} from "./SelectPPiOptions.jsx";


import "../styles/ExecuteBar.scss";
import { AppContext } from "./AppContext.jsx";

const ExecuteBar = ({ href, label }) => {
    const { 
        uploadFilePpi,
        quickRunClusterOne,
        ppiId,
		modalOpen,
		setLoading,
		setModalOpen,
		getAllPpi,
    } = React.useContext(AppContext);
	

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
			
			{/*<RunFunctionButton
				label="Select an example PPI"
				icon="fa fa-search"
				onClickFunction={
                    () => console.log("Explore PPI")
                }
				classname={"explorePpiButton"}
			/>*/}
			<SelectPPiOptions
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				label="Select an example PPI"
				icon="fa fa-search"
				onClickFunction={
                    () => {
						getAllPpi();
						setModalOpen(true)
					}
                }
				classname={"explorePpiButton"}
			/>
			<RunFunctionButton
				label="Load your PPI"
				icon="fa fa-upload"
				onClickFunction={() => {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = '.csv, .txt';
                    fileInput.onchange = () => uploadFilePpi(fileInput);
                    fileInput.click();
                }}
				classname={"explorePpiButton"}
			/>
			<RunFunctionButton
				label="Quick Run ClusterONE"
				icon="fa fa-forward"
				onClickFunction={() => {
                    console.log("Quick Run ClusterONE");
                    setLoading(true);
                    quickRunClusterOne(ppiId); 
                }}
				classname={"runClusterOneButton"}
				message={"with default parameters"}
			/>
			<ClusterOneParams
				label="Run ClusterONE"
				icon="fa fa-play"
				classname={"runClusterOneButton"}
				message={"with custom parameters"}
			/>
            <ClusterFilter />
			<a className="config-ppi">
				PPI ID SELECTED: {ppiId}
			</a>
			<a href={href} className="config-link">
				{label}
			</a>
		</div>
	);
};

export { ExecuteBar };
