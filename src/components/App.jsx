import React from "react";
import { Cy } from "./CyGraph.jsx";
import { ExecuteBar } from "./ExecuteBar.jsx";


const App = () => {
    var protein = {
        id: "P12345"
    };
    return (
        <div>
            <Cy protein={protein.id}/>
            <ExecuteBar />
        </div>
    );
};

export default App;
