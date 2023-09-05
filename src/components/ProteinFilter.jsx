import React from "react";
import "../styles/ProteinFilter.scss";

const ProteinFilter = () => {
    // Los componentes son capaces de almacenar un estado interno mediante el uso del estado de React.
    const [proteinsName, setProteinsName] = React.useState('');
    const handleProteinChange = (event) => {
        setProteinsName(event.target.value);
    }
    return (
        <div className={"proteinContainer"}>
            <label htmlFor="proteinSelect" className={"proteinLabel"}>Protein:</label>
            <select 
                id="proteinSelect" 
                value={proteinsName} 
                onChange={handleProteinChange} 
                className={"proteinDropdown"}
            >
                <option value="PROTEIN1">PROTEIN 1</option>
                <option value="PROTEIN2">PROTEIN 2</option>
                <option value="PROTEIN3">PROTEIN 3</option>
                <option value="PROTEIN4">PROTEIN 4</option>
                {/* Tus opciones aquí */}
            </select>
        </div>
    );
}

export { ProteinFilter };