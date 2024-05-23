import React from "react";
import { AppContext } from "./AppContext.jsx";
import "../styles/ProteinFilter.scss";

const ProteinFilter = ({ top, left }) => {
    // Los componentes son capaces de almacenar un estado interno mediante el uso del estado de React.
    const {
        complexProteinList,
        showComplexList,
        setProteinId
    } = React.useContext(AppContext);
    
    const handleProteinChange = (event) => {
        if (event.target.value === "0") {
            return;
        }
        setProteinId(event.target.value);
    }
    
    return (
        <div
            style={{
                top: top,
                left: left,
            }} 
            className={"proteinContainer"}>
            <label htmlFor="proteinSelect" className={"proteinLabel"}>Protein:</label>
            <select 
                id="proteinSelect"
                onChange={handleProteinChange} 
                className={"proteinDropdown"}
            >
                {
                    showComplexList ?
                        complexProteinList.map((protein) => (
                            <option value={protein.id} key={protein.id}>
                                {protein.name}
                            </option>
                        ))
                    :
                        <option value={0} key={0}>
                            NO PROTEINS
                        </option>
                }
            </select>
        </div>
        
    );
}

export { ProteinFilter };