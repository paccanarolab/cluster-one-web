import React from "react";
import "../styles/ClusterFilter.scss";
import { AppContext } from "./AppContext.jsx";

const ClusterFilter = () => {
	// Los componentes son capaces de almacenar un estado interno mediante el uso del estado de React.
	const {
		size,
		setSize,
		density,
		setDensity,
		quantity,
		setQuantity,
		externalWeight,
		setExternalWeight,
		internalWeight,
		setInternalWeight,
		clusterCode,
		setClusterCode,
        clearClusterFilter
	} = React.useContext(AppContext);

	const handleClusterCodeChange = (event) => {
		setClusterCode(event.target.value);
	};
	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};
	const handleDensityChange = (event) => {
		setDensity(event.target.value);
	};
	const handleSizeChange = (event) => {
		setSize(event.target.value);
	};
	const handleExternalWeightChange = (event) => {
		setExternalWeight(event.target.value);
	};
	const handleInternalWeightChange = (event) => {
		setInternalWeight(event.target.value);
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
			<button
				style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
				onClick={clearClusterFilter}>
				Clear
			</button>
			<div style={{ display: "flex", width: "100%", gap: "5px" }}>
				<input
					type="number"
					placeholder="Size"
					style={{ marginBottom: "15px", width: "100%" }}
					name="size"
					value={size}
					onChange={handleSizeChange}
				/>
				<input
					type="number"
					placeholder="Density"
					name="density"
					style={{ marginBottom: "15px", width: "100%" }}
					value={density}
					onChange={handleDensityChange}
				/>

				<input
					type="number"
					placeholder="Quantity"
					name="quantity"
					style={{ marginBottom: "15px", width: "100%" }}
					value={quantity}
					onChange={handleQuantityChange}
				/>
			</div>
			<input
				type="number"
				placeholder="External Weight"
				name="externalWeight"
				value={externalWeight}
				style={{ marginBottom: "15px", width: "91.5%" }}
				onChange={handleExternalWeightChange}
			/>

			<input
				type="number"
				placeholder="Internal Weight"
				name="internalWeight"
				value={internalWeight}
				style={{ marginBottom: "15px", width: "91.5%" }}
				onChange={handleInternalWeightChange}
			/>

			<select
				value={clusterCode}
				onChange={handleClusterCodeChange}
				style={{ marginBottom: "15px", width: "100%" }}
				className="config-dropdown">
				<option value="layout1">CODE 1</option>
				<option value="layout2">CODE 2</option>
				<option value="layout3">CODE 3</option>
				<option value="layout4">CODE 5</option>
				{/* Puedes agregar más opciones si lo necesitas */}
			</select>
		</div>
	);
};

export { ClusterFilter };
