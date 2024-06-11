import React from "react";
import { AppContext } from "./AppContext.jsx";
import { Slider } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const ClusterFilter = ({top, left}) => {
	const {
		complexList,
		cyGraphList,
        clearClusterFilter,
		setComplexList,
		setCyGraph,
		setComplexCounter,
		setSize,
		setDensity,
		setQuality,
		minsize,
		maxsize,
		minDensity,
		maxDensity,
		minQuality,
		maxQuality,
		complexCounter,
		size,
		density,
		quality,
	} = React.useContext(AppContext);

	const clearSlider = () => {
		setSize([minsize, maxsize]);
		setDensity("");
		setQuality("");
		setCyGraph(cyGraphList[0]);
	};


	const handleSignificancePvalueChange = (event) => {
		var valuePvalue = event.target.value;
		if (valuePvalue === "p > 0.05") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value > 0.05) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				setComplexList(cyGraphList);
				setComplexCounter(cyGraphList.length);
				setCyGraph(cyGraphList[0]);
			}else{
				setComplexList(auxfilter);
				setComplexCounter(auxfilter.length);
				setCyGraph(auxfilter[0]);
			}
		} else if (valuePvalue === "p <= 0.05") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value <= 0.05) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				setComplexList(cyGraphList);
				setCyGraph(cyGraphList[0]);
			}else{
				setComplexList(auxfilter);
				setComplexCounter(auxfilter.length);
				setCyGraph(auxfilter[0]);
			}
		} else if (valuePvalue === "p <= 0.01") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value <= 0.01) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				setComplexList(cyGraphList);
				setComplexCounter(cyGraphList.length);
				setCyGraph(cyGraphList[0]);
			}else{
				setComplexList(auxfilter);
				setComplexCounter(auxfilter.length);
				setCyGraph(auxfilter[0]);
			}
		}
		else if (valuePvalue === "p <= 0.001") {
			let auxfilter = [];
			for (let i = 0; i < complexList.length; i++) {
				if (complexList[i].p_value <= 0.001) {
					auxfilter.push(complexList[i]);
				}
			}
			if (auxfilter.length === 0) {
				setComplexList(cyGraphList);
				setComplexCounter(cyGraphList.length);
				setCyGraph(cyGraphList[0]);
			}else{
				console.log(auxfilter);
				setComplexList(auxfilter);
				setComplexCounter(auxfilter.length);
				setCyGraph(auxfilter[0]);
			}
		} else if (valuePvalue === "clear") {
			setComplexList(cyGraphList);
			setComplexCounter(cyGraphList.length);
			setCyGraph(cyGraphList[0]);
		}

	};

	const handleSliderSizeChange = (event, newValue) => {
		setSize(newValue);
		let minVal = newValue[0];
		let maxVal = newValue[1];
		let auxfilter = [];
		for (let i = 0; i < complexList.length; i++) {
			if (density === "" && quality === "") {
				if (complexList[i].size >= minVal && complexList[i].size <= maxVal) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality === "") {
				if (complexList[i].size >= minVal && complexList[i].size <= maxVal && complexList[i].density <= density) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality !== "") {
				if (complexList[i].size >= minVal && complexList[i].size <= maxVal && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality !== "") {
				if (complexList[i].size >= minVal && complexList[i].size <= maxVal && complexList[i].density <= density && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			}
		}
		if (auxfilter.length === 0) {
			console.log("No hay grafos con size <= " + newValue);
			setComplexList(cyGraphList);
			setComplexCounter(cyGraphList.length);
			clearSlider();
		}else{
			console.log("Hay grafos con size <= " + newValue);
			setComplexList(auxfilter);
			setComplexCounter(auxfilter.length);
			setCyGraph(auxfilter[0]);
		}
	};

	const handleSliderDensityChange = (event, newValue) => {
		setDensity(newValue);
		let auxfilter = [];
		for (let i = 0; i < complexList.length; i++) {
			if (size === "" && quality === "") {
				if (complexList[i].density <= newValue) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality === "") {
				let minVal = size[0];
				let maxVal = size[1];
				if (complexList[i].density >= newValue && complexList[i].size >= minVal && complexList[i].size <= maxVal) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality !== "") {
				if (complexList[i].density <= newValue && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality !== "") {
				let minVal = size[0];
				let maxVal = size[1];
				if (complexList[i].density <= newValue && complexList[i].size >= minVal && complexList[i].size <= maxVal && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			}
		}
		if (auxfilter.length === 0) {
			console.log("No hay grafos con density <= " + newValue);
			setComplexList(cyGraphList);
			setComplexCounter(cyGraphList.length);
			clearSlider();
		}else{
			console.log("Hay grafos con density <= " + newValue);
			setComplexList(auxfilter);
			setComplexCounter(auxfilter.length);
			setCyGraph(auxfilter[0]);
		}
	};

	const handleSliderQualityChange = (event, newValue) => {
		setQuality(newValue);
		let auxfilter = [];
		for (let i = 0; i < complexList.length; i++) {
			if (size === "" && density === "") {
				if (complexList[i].quality <= newValue) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density === "") {
				let minVal = size[0];
				let maxVal = size[1];
				if (complexList[i].quality <= newValue && complexList[i].size >= minVal && complexList[i].size <= maxVal) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density !== "") {
				if (complexList[i].quality <= newValue && complexList[i].density <= density) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density !== "") {
				let minVal = size[0];
				let maxVal = size[1];
				if (complexList[i].quality <= newValue && complexList[i].size >= minVal && complexList[i].size <= maxVal && complexList[i].density <= density) {
					auxfilter.push(complexList[i]);
				}
			}
		}
		if (auxfilter.length === 0) {
			console.log("No hay grafos con quality <= " + newValue);
			setComplexList(cyGraphList);
			setComplexCounter(cyGraphList.length);
			clearSlider();
		}else{
			console.log("Hay grafos con quality <= " + newValue);
			setComplexList(auxfilter);
			setComplexCounter(auxfilter.length);
			setCyGraph(auxfilter[0]);
		}
	};

	return (
		<div 
			className="complex" 
			id="cfilter"
			style={{
				width: "10%",
				height: "10%",
				position: "fixed",
				top: top,
				left: left,
				zIndex: 1000
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
				Complex counter: {complexCounter}
			</div>
			
			{
				// <select
				// 	style={{ marginBottom: "15px", width: "100%" }}
				// 	className="config-dropdown"
				// 	onChange={handleSignificancePvalueChange}
				// >	
				// 	<option value="clear">All p-values</option>
				// 	<option value="p > 0.05">Not significant p-value {"(p > 0.05)"}</option>
				// 	<option value="p <= 0.05">Significant p-value {"(p <= 0.05)"}</option>
				// 	<option value="p <= 0.01">Very significant p-value {"(p <= 0.01)"}</option>
				// 	<option value="p <= 0.001">Highly significant p-value {"(p <= 0.001)"}</option>
				// </select>
			}
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px",
					color: "black"
				}}>
				Size
			</div>
			<Slider
				getAriaLabel={() => 'Temperature range'}
				value={size}
				min={minsize}
				max={maxsize}
				step={1}
				marks={false}
				onChange={handleSliderSizeChange}
				valueLabelDisplay="auto"
			/>
			
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "10px",
					justifyContent: "left",
					fontSize: "15px",
					color: "black"
				}}>
				Density
			</div>
			<Slider
				defaultValue={minDensity}
				valueLabelDisplay="auto"
				step={0.0001}
				marks={false}
				min={minDensity}
				max={maxDensity}
				onChange={handleSliderDensityChange}
			/>
			
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "10px",
					justifyContent: "left",
					fontSize: "15px",
					color: "black"
				}}>
				Cohesiveness
			</div>
			<Slider
				defaultValue={minQuality}
				valueLabelDisplay="auto"
				step={0.0001}
				marks={false}
				min={minQuality}
				max={maxQuality}
				onChange={handleSliderQualityChange}
			/>
			
			<button
				style={{
					marginBottom: "15px",
					width: "90%",
					padding: "10px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "5px",
				}}
				onClick={clearClusterFilter}>
				<div style={{ marginRight: "5px" }}>
					Clear
				</div>
				<ClearIcon />
			</button>
		</div>
	);
};

export { ClusterFilter };
