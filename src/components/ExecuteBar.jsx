import React from "react";
import "../styles/ExecuteBar.scss";
const ExecuteBar = ({ href, label }) => {
    return (
            <div className="config" id="config">
                <span className="fa fa-bars config-toggle" id="config-toggle"></span>
                <span className="config-title">ClusterONE WEB</span>
                <p>Manipulation and Analysis clusters</p> 
                <a href={href} className="config-link">
                {label}</a>
            </div>
            
    );
}

export { ExecuteBar };