import React from "react";
import { Layout } from "./Layout.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import { RunFunctionButton } from "./RunFunctionButton.jsx";
import { ClusterOneParams } from "./ClusterOneParams.jsx";
import {SelectPPiOptions} from "./SelectPPiOptions.jsx";
import { ScoreTable } from "./ScoreTable.jsx";

import "../styles/ExecuteBar.scss";
import { AppContext } from "./AppContext.jsx";

const ExecuteBar = ({ href, label }) => {
    const { 
        uploadFilePpi,
        quickRunClusterOne,
        ppiId,
		ppiLabel,
		modalOpen,
		setLoading,
		setLoadingMessage,
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
					setLoadingMessage("Running ClusterONE and storing results... you can go for a coffee ☕️!");
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
			<ScoreTable />
			<a href={href} className="config-link" target="_blank" rel="noopener noreferrer">
				{label}
			</a>
		</div>
	);
};

export { ExecuteBar };
