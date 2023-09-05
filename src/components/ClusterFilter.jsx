import React from "react";
import "../styles/ClusterFilter.scss";

const ClusterFilter = () => {
    // Los componentes son capaces de almacenar un estado interno mediante el uso del estado de React.
    const [clusterCode, setClusterCode] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [density, setDensity] = React.useState('');
    const [size, setSize] = React.useState('');
    const [externalWeight, setExternalWeight] = React.useState('');
    const [internalWeight, setInternalWeight] = React.useState('');

    const handleClusterCodeChange = (event) => {
        setClusterCode(event.target.value);
    }
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }
    const handleDensityChange = (event) => {
        setDensity(event.target.value);
    }
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }
    const handleExternalWeightChange = (event) => {
        setExternalWeight(event.target.value);
    }
    const handleInternalWeightChange = (event) => {
        setInternalWeight(event.target.value);
    }


    return (
        <div className="complex" id="cfilter">
            <div>Complex Filter</div>
            <button
                onClick={() => {
                    setSize('');
                    setDensity('');
                    setQuantity('');
                    setExternalWeight('');
                    setInternalWeight('');
                    setClusterCode('');
                }}
            >
                Clear
            </button>
            <input
                type="number"
                placeholder="Size"
                name="size"
                value={size}
                onChange={handleSizeChange}
            />
            <input
                type="number"
                placeholder="Density"
                name="density"
                value={density}
                onChange={handleDensityChange}
            />
    
            <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
            />
    
            <input
                type="number"
                placeholder="External Weight"
                name="externalWeight"
                value={externalWeight}
                onChange={handleExternalWeightChange}
            />
    
            <input
                type="number"
                placeholder="Internal Weight"
                name="internalWeight"
                value={internalWeight}
                onChange={handleInternalWeightChange}
            />
            
            <select 
                value={clusterCode}
                onChange={handleClusterCodeChange}
                className="config-dropdown"
            >
                <option value="layout1">CODE 1</option>
                <option value="layout2">CODE 2</option>
                <option value="layout3">CODE 3</option>
                <option value="layout4">CODE 5</option>
                {/* Puedes agregar más opciones si lo necesitas */}
            </select>
            
            

        </div>
    );    
}

export { ClusterFilter };