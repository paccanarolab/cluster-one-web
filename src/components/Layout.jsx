import React , { useState, useEffect } from "react";
import { AppContext } from "./AppContext.jsx";

const AvailableLayouts = [
    {
        name: "random",
        fit: true,
        idealEdgeLength: function(edge){
            if(edge.data('source').type === 'proteinComplex' || edge.data('target').type === 'proteinComplex') {
                return 500; // Aumenta este valor para dar más espacio entre los nodos proteinComplex
            }
            return 200; // o cualquier otro valor por defecto que desees.
        },
        // circle: true,
        directed: true,
        padding: 50,
        // spacingFactor: 1.5,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "grid",
        fit: true,
        padding: 30,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "circle",
        fit: true,
        padding: 30,
        sort: function(a, b){ return a.degree() - b.degree(); },
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false,
        idealEdgeLength: function(edge){
            if(edge.data('source').type === 'proteinComplex' || edge.data('target').type === 'proteinComplex') {
                return 500; // Aumenta este valor para dar más espacio entre los nodos proteinComplex
            }
            return 200; // o cualquier otro valor por defecto que desees.
        },
    },
    {
        name: "concentric",
        fit: true,
        minNodeSpacing: 50,
        equidistant: false,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false,
        idealEdgeLength: function(edge){
            if(edge.data('source').type === 'proteinComplex' || edge.data('target').type === 'proteinComplex') {
                return 500; // Aumenta este valor para dar más espacio entre los nodos proteinComplex
            }
            return 200; // o cualquier otro valor por defecto que desees.
        },
    },
    {
        name: "breadthfirst",
        fit: true,
        directed: true,
        padding: 30,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false,
        idealEdgeLength: function(edge){
            if(edge.data('source').type === 'proteinComplex' || edge.data('target').type === 'proteinComplex') {
                return 500; // Aumenta este valor para dar más espacio entre los nodos proteinComplex
            }
            return 200; // o cualquier otro valor por defecto que desees.
        },
    },
    {
        name: 'cose',
        idealEdgeLength: function(edge){
            if(edge.data('source').type === 'proteinComplex' || edge.data('target').type === 'proteinComplex') {
                return 500; // Aumenta este valor para dar más espacio entre los nodos proteinComplex
            }
            return 200; // o cualquier otro valor por defecto que desees.
        },
        // nodeOverlap: 4, 
        refresh: 20,
        fit: true,
        padding: 40,
        randomize: false,
        componentSpacing: 300,
        nodeRepulsion: 8000000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
        animate: true,
        minNodeSpacing: 100,
        avoidOverlap: true,
    },
];

const Layout = ({classname}) => {
    const { 
        layout,
        setLayout,  
    } = React.useContext(AppContext);

    const [layoutSelected, setLayoutSelected] = useState("");
    
    const handleChangeLayout = (event) => {
        setLayout(JSON.parse(event.target.value));
        setLayoutSelected(event.target.value);
    };

    useEffect(() => {
        if (layout) {
          setLayoutSelected(JSON.stringify(layout));
        }
      }, [layout]);
    
    return (
        <div>
            <select 
                value={layoutSelected}
                onChange={handleChangeLayout}
                className={classname}
            >
                <option disabled selected>Select a Layout</option>
                {AvailableLayouts.map((layoutOption, index) => (
                    <option key={index} value={JSON.stringify(layoutOption)}>
                        {layoutOption.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export { Layout };
