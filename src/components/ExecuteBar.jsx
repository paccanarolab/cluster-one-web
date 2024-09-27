import React from "react";
import { RunFunctionButton } from "./RunFunctionButton.jsx";
import { ClusterOneParams } from "./ClusterOneParams.jsx";
import {SelectPPiOptions} from "./SelectPPiOptions.jsx";
import { ScoreTable } from "./ScoreTable.jsx";
import { InitialView } from "./InitialView.jsx";

import "../styles/ExecuteBar.scss";
import { AppContext } from "./AppContext.jsx";

const ExecuteBar = ({ href, label }) => {
    const { 
        uploadFilePpi,
		uploadGoaFile,
        quickRunClusterOne,
        ppiId,
		handleShowMenu,
		goaFileName,
		modalOpen,
		setLoading,
		setLoadingMessage,
		setModalOpen,
		getAllPpi,
		oraScore,
		ppiLabel,
		setLoadingInterval,
		loadingIntervalClusterOne,
    } = React.useContext(AppContext);
	

    return (
		<div className="config" id="config">
			<div
				style={{
					fontSize: "20px",
					marginBottom: "20px",
				}}>
				<span
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontSize: "30px",
					}}>
					ClusterONE Web
				</span>
			</div>
            <div
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "20px",
					borderRadius: "5px",
					padding: "10px",
					color: "white",
					border: "1px solid #fff",
				}}
			>	
				<span
					style={{
						display: "flex",
						justifyContent: "left",
						alignItems: "left",
					}}>
					Protein Protein Interaction options
				</span>
				<InitialView
					label="Select DataBase"
					icon="fa fa-search"
					classname={"explorePpiButton"}
				/>
				{/*<SelectPPiOptions
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
				/>*/}
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
					message={ppiId ? "PPI LOADED" : "PPI NOT LOADED"}
				/>
				{
					ppiId &&
					<span
						style={{
							display: "flex",
							justifyContent: "left",
							alignItems: "left",
						}}>
						PPI Loaded: {ppiLabel}
					</span>
				}
			</div>
			<div
				style={{
					// display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "20px",
					// backgroundColor: "rgba(0, 0, 0, 0.8)",
					borderRadius: "5px",
					padding: "10px",
					color: "white",
					border: "1px solid #fff",
				}}
			>
				<span
					style={{
						display: "flex",
						justifyContent: "left",
						alignItems: "left",
					}}>
					Enrichment Analysis (Optional)
				</span>
				<RunFunctionButton
					label="Load your GOA file"
					icon="fa fa-upload"
					onClickFunction={() => {
						const fileInput = document.createElement('input');
						fileInput.type = 'file';
						fileInput.accept = '.gaf';
						fileInput.onchange = () => uploadGoaFile(fileInput);
						fileInput.click();
					}}
					classname={"explorePpiButton"}
					message={goaFileName ? "GOA FILE LOADED" : "GOA FILE NOT LOADED"}
				/>
			</div>
			{
				ppiId &&
				<RunFunctionButton
					label="Quick Run ClusterONE"
					icon="fa fa-forward"
					onClickFunction={() => {
						setLoadingInterval(loadingIntervalClusterOne);
						setLoadingMessage("Running ClusterONE and rendering the results on screen wait a moment please, the time depend of PPI size. You can go for a coffee 🧬☕️");
						setLoading(true);
						handleShowMenu();
						quickRunClusterOne(ppiId, 400000); 
					}}
					classname={"runClusterOneButton"}
					message={"with default parameters"}
				/>
			}

			{
				ppiId &&
				<ClusterOneParams
					label="Run ClusterONE"
					icon="fa fa-play"
					classname={"runClusterOneButton"}
					message={"with custom parameters"}
					disabled={false}
					initialView={false}
				/>
			}

			{
				goaFileName &&
				oraScore.bp_score !== 0 &&
				oraScore.mf_score !== 0 &&
				oraScore.cc_score !== 0 && (
					<ScoreTable />
				)
			}
			<a href={href} className="config-link" target="_blank" rel="noopener noreferrer">
				{label}
			</a>
		</div>
	);
};

export { ExecuteBar };
