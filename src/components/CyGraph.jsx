import React from "react";
import { ProteinFilter } from "./ProteinFilter.jsx";

const proteinComplexStyle = {
    width: "100",
    height: "100",
    backgroundColor: "red",
    marginLeft: "90px",
    fontSize: "40px",
    color: "white",
    padding: "48px",
};

const proteinComplexStyle2 = {
    width: "100",
    height: "100",
    backgroundColor: "blue",
    marginLeft: "90px",
    fontSize: "40px",
    color: "white",
    padding: "48px",
};

const edgeStyle = {
    width: "100",
    height: "100",
    backgroundColor: "green",
    marginLeft: "90px",
    fontSize: "20px",
    color: "white",
    padding: "48px",
};


const Cy = ({protein_id, protein_info}) => {
    return (
            <div id="cy">
                <p style={proteinComplexStyle} > Protein {protein_id} - {protein_info}</p>
                <p style={proteinComplexStyle2} > Protein {protein_id} - {protein_info}</p>
                <p style={edgeStyle} > Edge into Protein {protein_id} </p>
            </div>
    );
};

export { Cy };