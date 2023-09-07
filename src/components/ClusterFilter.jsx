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
		complexList,
		setSize,
		setDensity,
		setQuantity,
		setExternalWeight,
		setInternalWeight,
        clearClusterFilter,
		setCyGraph,
		cyGraph,
	} = React.useContext(AppContext);

	
	const validateClusterFilter = (excludeIndex) => {
		const params = [quantity, density, size, externalWeight, internalWeight];
		// Si excludeIndex es un número válido, eliminamos el elemento en esa posición
		if (typeof excludeIndex === 'number' && excludeIndex >= 0 && excludeIndex < params.length) {
		  params.splice(excludeIndex, 1);
		}
		// Verificar que todos los elementos restantes cumplen con la condición
		return params.every(param => param && param !== "0" && param !== 0);
	};
	
	// Tengo que ver la forma de persistir la lista de grafos
	const handleClusterCodeChange = (event) => {
		setCyGraph(JSON.parse(event.target.value));
	};
	  		
	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
		setTimeout(() => {
			let auxfilter = complexList.filter(
				(graphData) => {
					graphData.quantity === event.target.value 
					&& graphData.density === density 
					&& graphData.size === size
					&& graphData.externalWeight === externalWeight
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				window.alert("COMPLEX Not Found");
				setCyGraph(complexList[0]);
			}else{
				setCyGraph(auxfilter[0]);
			}
		}, 1000);
};

	const handleDensityChange = (event) => {
		setDensity(event.target.value);
		setTimeout(() => {
			let auxfilter = complexList.filter(
				(graphData) => {
					graphData.density === event.target.value
					&& graphData.quantity === quantity
					&& graphData.size === size
					&& graphData.externalWeight === externalWeight
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				window.alert("COMPLEX Not Found");
				setCyGraph(complexList[0]);
			}else{
				setCyGraph(auxfilter[0]);
			}
		}, 1000);
	};


	const handleSizeChange = (event) => {
		setSize(event.target.value);
		setTimeout(() => {
			let auxfilter = complexList.filter(
				(graphData) => {
					graphData.size === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.density === density
					&& graphData.externalWeight === externalWeight
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				window.alert("COMPLEX Not Found");
				setCyGraph(complexList[0]);
			}else{
				setCyGraph(auxfilter[0]);
			}
		}, 1000);
	};

	const handleExternalWeightChange = (event) => {
		setExternalWeight(event.target.value);
		setTimeout(() => {
			let auxfilter = complexList.filter(
				(graphData) => {
					graphData.externalWeight === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.density === density
					&& graphData.size === size
					&& graphData.internalWeight === internalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				window.alert("COMPLEX Not Found");
				setCyGraph(complexList[0]);
			}else{
				setCyGraph(auxfilter[0]);
			}
		}
		, 1000);
	};

	const handleInternalWeightChange = (event) => {
		setInternalWeight(event.target.value);
		setTimeout(() => {
			let auxfilter = complexList.filter(
				(graphData) => {
					graphData.internalWeight === event.target.value 
					&& graphData.quantity === quantity 
					&& graphData.density === density
					&& graphData.size === size
					&& graphData.externalWeight === externalWeight
				}
			);
			if (auxfilter.length === 0 || auxfilter === undefined) {
				window.alert("COMPLEX Not Found");
				setCyGraph(complexList[0]);
			}else{
				setCyGraph(auxfilter[0]);
			}
		}
		, 1000);
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

			

			<button
				style={{ marginBottom: "15px", width: "98%", padding: "10px" }}
				onClick={clearClusterFilter}>
				Clear
			</button>
		</div>
	);
};

export { ClusterFilter };
