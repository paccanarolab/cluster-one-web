import React from "react";
import { AppContext } from "./AppContext.jsx";

const AvailableLayouts = [
    {
        name: "random",
        fit: true,
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
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "concentric",
        fit: true,
        minNodeSpacing: 50,
        equidistant: false,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "breadthfirst",
        fit: true,
        directed: true,
        padding: 30,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "cose",
        fit: true,
        padding: 50,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "dagre",
        fit: true,
        padding: 30,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "spread",
        fit: true,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "euler",
        fit: true,
        padding: 30,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    },
    {
        name: "klay",
        fit: true,
        padding: 50,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    }
   // Puedes agregar más layouts si lo necesitas
];

const Layout = ({classname}) => {
    const { layout, handleChangeLayout } = React.useContext(AppContext);
    return (
        <div>
            <select value={layout} onChange={handleChangeLayout} className={classname}>
                {AvailableLayouts.map((layout, index) => (
                    <option key={index} value={layout.name}>
                        {layout.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export { Layout };
