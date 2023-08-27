import React from "react";

const ProteinFilter = () => {
    // Los componentes son capaces de almacenar un estado interno mediante el uso del estado de React.
    const [proteinsName, setProteinsName] = React.useState('');
    const handleProteinChange = (event) => {
        setProteinsName(event.target.value);
    }
    return (
        <div className="proteinfilter" id="pfilter">
            <input
                type="text"
                placeholder="Filter by protein name"
                value={proteinsName}
                onChange={handleProteinChange}
            />
            <button
                onClick={() => {
                    setProteinsName('');
                }
                }
            >
                Clear
            </button>
        </div>
    );
}

export { ProteinFilter };