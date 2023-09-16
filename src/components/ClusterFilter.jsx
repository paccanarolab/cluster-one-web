import React from "react";
import "../styles/ClusterFilter.scss";
import { AppContext } from "./AppContext.jsx";
import { Slider } from "@mui/material";

const ClusterFilter = () => {
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
		setSize("");
		setDensity("");
		setQuality("");
		setCyGraph(cyGraphList[0]);
	};

	const handleClusterCodeChange = (event) => {
		setCyGraph(JSON.parse(event.target.value));
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
				console.log("No hay grafos con p-value > 0.05");
				setComplexList(cyGraphList);
				setComplexCounter(cyGraphList.length);
				setCyGraph(cyGraphList[0]);
			}else{
				console.log("Hay grafos con p-value > 0.05");
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
				console.log("No hay grafos con p-value <= 0.05");
				setComplexList(cyGraphList);
				setCyGraph(cyGraphList[0]);
			}else{
				console.log("Hay grafos con p-value <= 0.05");
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
				console.log("No hay grafos con p-value <= 0.01");
				setComplexList(cyGraphList);
				setComplexCounter(cyGraphList.length);
				setCyGraph(cyGraphList[0]);
			}else{
				console.log("Hay grafos con p-value <= 0.01");
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
				console.log("No hay grafos con p-value <= 0.001");
				setComplexList(cyGraphList);
				setComplexCounter(cyGraphList.length);
				setCyGraph(cyGraphList[0]);
			}else{
				console.log("Hay grafos con p-value <= 0.001");
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
		let auxfilter = [];
		for (let i = 0; i < complexList.length; i++) {
			if (density === "" && quality === "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo size");
				if (complexList[i].size <= newValue) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality === "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo density y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality !== "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo quality y size");
				if (complexList[i].size <= newValue && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality === "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo external_weight y size");
				if (complexList[i].size <= newValue && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality === "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality !== "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo density, quality y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality === "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo density, external_weight y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality === "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo density, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality !== "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo quality, external_weight y size");
				if (complexList[i].size <= newValue && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality !== "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo quality, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].quality <= quality && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality === "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo external_weight, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality !== "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo density, quality, external_weight y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality !== "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo density, quality, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].quality <= quality && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality === "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo density, external_weight, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density === "" && quality !== "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo quality, external_weight, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (density !== "" && quality !== "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo density, quality, external_weight, internal_weight y size");
				if (complexList[i].size <= newValue && complexList[i].density <= density && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
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
			if (size === "" && quality === "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo density");
				if (complexList[i].density <= newValue) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality === "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo size y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality !== "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo quality y density");
				if (complexList[i].density <= newValue && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality === "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo external_weight y density");
				if (complexList[i].density <= newValue && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality === "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality !== "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo size, quality y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].quality <= quality) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality === "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo size, external_weight y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality === "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo size, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality !== "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo quality, external_weight y density");
				if (complexList[i].density <= newValue && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality !== "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo quality, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].quality <= quality && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality === "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo external_weight, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality !== "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo size, quality, external_weight y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality !== "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo size, quality, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].quality <= quality && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality === "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo size, external_weight, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && quality !== "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo quality, external_weight, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && quality !== "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo size, quality, external_weight, internal_weight y density");
				if (complexList[i].density <= newValue && complexList[i].size <= size && complexList[i].quality <= quality && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
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
			if (size === "" && density === "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo quality");
				if (complexList[i].quality <= newValue) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density === "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo size y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density !== "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo density y quality");
				if (complexList[i].quality <= newValue && complexList[i].density <= density) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density === "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo external_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density === "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density !== "" && externalWeight === "" && internalWeight === "") {
				console.log("Solo size, density y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].density <= density) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density === "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo size, external_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density === "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo size, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density !== "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo density, external_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].density <= density && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density !== "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo density, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].density <= density && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density === "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo external_weight, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density !== "" && externalWeight !== "" && internalWeight === "") {
				console.log("Solo size, density, external_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].density <= density && complexList[i].external_weight <= externalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density !== "" && externalWeight === "" && internalWeight !== "") {
				console.log("Solo size, density, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].density <= density && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density === "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo size, external_weight, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size === "" && density !== "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo density, external_weight, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].density <= density && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
					auxfilter.push(complexList[i]);
				}
			} else if (size !== "" && density !== "" && externalWeight !== "" && internalWeight !== "") {
				console.log("Solo size, density, external_weight, internal_weight y quality");
				if (complexList[i].quality <= newValue && complexList[i].size <= size && complexList[i].density <= density && complexList[i].external_weight <= externalWeight && complexList[i].internal_weight <= internalWeight) {
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
		<div className="complex" id="cfilter">
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "center",
					fontSize: "20px"
				}}>
				Complex Filter
			</div>
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
			<select
				onChange={handleClusterCodeChange}
				style={{ marginBottom: "15px", width: "100%" }}
				className="config-dropdown"
			>
				{complexList.map((graphData, index) => (
					<option key={index} value={JSON.stringify(graphData)}>
						{graphData.code ? ("COMPLEX - " + graphData.code) : "NO COMPLEX"}
					</option>
				))}
			</select>
			
			<select
				style={{ marginBottom: "15px", width: "100%" }}
				className="config-dropdown"
				onChange={handleSignificancePvalueChange}
			>	
				<option value="clear">All p-values</option>
				<option value="p > 0.05">Not significant p-value {"(p > 0.05)"}</option>
				<option value="p <= 0.05">Significant p-value {"(p <= 0.05)"}</option>
				<option value="p <= 0.01">Very significant p-value {"(p <= 0.01)"}</option>
				<option value="p <= 0.001">Highly significant p-value {"(p <= 0.001)"}</option>
			</select>
			
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px"
				}}>
				Size
			</div>
			<Slider
				defaultValue={minsize}
				valueLabelDisplay="auto"
				step={1}
				marks={false}
				min={minsize}
				max={maxsize}
				onChange={handleSliderSizeChange}
			/>
			
			<div
				style={{
					display: "flex",
					marginTop: "15px",
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px"
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
					marginBottom: "15px",
					justifyContent: "left",
					fontSize: "15px"
				}}>
				Quality
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
				style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
				onClick={clearClusterFilter}>
				Clear
			</button>
		</div>
	);
};

export { ClusterFilter };
