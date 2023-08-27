import React from "react";

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
            <input
                type="text"
                placeholder="Filter by cluster code"
                value={clusterCode}
                onChange={handleClusterCodeChange}
            />
            <input
                type="text"
                placeholder="Filter by quantity"
                value={quantity}
                onChange={handleQuantityChange}
            />
            <input
                type="text"
                placeholder="Filter by density"
                value={density}
                onChange={handleDensityChange}
            />
            <input
                type="text"
                placeholder="Filter by size"
                value={size}
                onChange={handleSizeChange}
            />
            <input
                type="text"
                placeholder="Filter by external weight"
                value={externalWeight}
                onChange={handleExternalWeightChange}
            />
            <input
                type="text"
                placeholder="Filter by internal weight"
                value={internalWeight}
                onChange={handleInternalWeightChange}
            />
            <button
                onClick={() => {
                    setClusterCode('');
                    setQuantity('');
                    setDensity('');
                    setSize('');
                    setExternalWeight('');
                    setInternalWeight('');
                }
                }
            >
                Clear
            </button>
        </div>
    );
}

export { ClusterFilter };