import React from "react";
import "../styles/ClusterFilter.scss";
import { AppContext } from "./AppContext.jsx";

const ClusterFilter = () => {
	const {
		size,
		density,
		quantity,
		externalWeight,
		internalWeight,
		graphList,
		setSize,
		setDensity,
		setQuantity,
		setExternalWeight,
		setInternalWeight,
        clearClusterFilter,
		setGraphList,
	} = React.useContext(AppContext);

	
	const validateClusterFilter = (excludeIndex) => {
		const params = [quantity, density, size, externalWeight, internalWeight];
		console.log("params before", params);
		// Si excludeIndex es un número válido, eliminamos el elemento en esa posición
		if (typeof excludeIndex === 'number' && excludeIndex >= 0 && excludeIndex < params.length) {
		  params.splice(excludeIndex, 1);
		}
		// Verificar que todos los elementos restantes cumplen con la condición
		console.log("params after", params);
		console.log("params.every", params.every(param => param && param !== "0" && param !== 0));
		return params.every(param => param && param !== "0" && param !== 0);
	};
	
	// Tengo que ver la forma de persistir la lista de grafos
	const handleClusterCodeChange = (event) => {
		setGraphList([JSON.parse(event.target.value)]);
	};
	  		
	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
		if (!validateClusterFilter(0)){
			setGraphList(graphList);
		}else{
			console.log("Podemos filtrar por cantidad");
			let auxfilter = graphList.filter(
				(graphData) => {
					graphData.quantity === event.target.value 
					&& graphData.density === density 
					&& graphData.size === size
					&& graphData.externalWeight === externalWeight
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				console.log("No hay grafos con esos parametros");
				setGraphList(graphList);
			}else{
				console.log("Hay grafos con esos parametros");
				setGraphList(auxfilter);
			}
		}
	};

	const handleDensityChange = (event) => {
		setDensity(event.target.value);
		if (!validateClusterFilter(1)){
			setGraphList(graphList);
		}else{
			console.log("Podemos filtrar por densidad");
			let auxfilter = graphList.filter(
				(graphData) => {
					graphData.density === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.size === size
					&& graphData.externalWeight === externalWeight
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				console.log("No hay grafos con esos parametros");
				setGraphList(graphList);
			}else{
				console.log("Hay grafos con esos parametros");
				setGraphList(auxfilter);
			}
		}
	};

	const handleSizeChange = (event) => {
		setSize(event.target.value);
		if (!validateClusterFilter(2)){
			setGraphList(graphList);
		}else{
			console.log("Podemos filtrar por size");
			let auxfilter = graphList.filter(
				(graphData) => {
					graphData.size === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.density === density
					&& graphData.externalWeight === externalWeight
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				console.log("No hay grafos con esos parametros");
				setGraphList(graphList);
			}else{
				console.log("Hay grafos con esos parametros");
				setGraphList(auxfilter);
			}
		}
	};

	const handleExternalWeightChange = (event) => {
		setExternalWeight(event.target.value);
		if (!validateClusterFilter(3)){
			setGraphList(graphList);
		}else{
			console.log("Podemos filtrar por externalWeight");
			let auxfilter = graphList.filter(
				(graphData) => {
					graphData.externalWeight === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.density === density
					&& graphData.size === size
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				console.log("No hay grafos con esos parametros");
				setGraphList(graphList);
			}else{
				console.log("Hay grafos con esos parametros");
				setGraphList(auxfilter);
			}
		}
	};

	const handleInternalWeightChange = (event) => {
		setInternalWeight(event.target.value);
		if (!validateClusterFilter(4)){
			setGraphList(graphList);
		}else{
			console.log("Podemos filtrar por internalWeight");
			let auxfilter = graphList.filter(
				(graphData) => {
					graphData.internalWeight === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.density === density
					&& graphData.size === size
					&& graphData.externalWeight === externalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				console.log("No hay grafos con esos parametros");
				setGraphList(graphList);
			}else{
				console.log("Hay grafos con esos parametros");
				setGraphList(auxfilter);
			}
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
				onChange={handleClusterCodeChange}
				style={{ marginBottom: "15px", width: "100%" }}
				className="config-dropdown"
			>
				{graphList.map((graphData, index) => (
					console.log("graphData", graphData),
					<option key={index} value={JSON.stringify(graphData)}>
						{graphData.code}
					</option>
				))}
			</select>
		</div>
	);
};

export { ClusterFilter };
