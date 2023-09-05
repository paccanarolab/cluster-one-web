import React from "react";
import { Layout } from "./Layout.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import "../styles/ExecuteBar.scss";


const ExecuteBar = ({ href, label }) => {
    return (
            <div className="config" id="config">
                <span>ClusterONE WEB</span>
                <p>Manipulation and Analysis clusters</p> 
                <Layout 
                    classname="config-dropdown"
                />
                <ClusterFilter />
                <a 
                    href={href}
                    className="config-link"
                >
                    {label}
                </a>
            </div>
            
    );
}

export { ExecuteBar };