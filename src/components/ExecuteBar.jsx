import React from "react";
import { Layout } from "./Layout.jsx";
import { ClusterFilter } from "./ClusterFilter.jsx";
import { RunFunctionButton } from "./RunFunctionButton.jsx";

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
            
                <RunFunctionButton
                    label="Quick Run ClusterONE"
                    icon="fa fa-play"
                    onClickFunction={() => console.log("Quick Run ClusterONE")}
                    classname={"runClusterOneButton"}
                />
                <RunFunctionButton
                    label="Run ClusterONE"
                    icon="fa fa-play"
                    onClickFunction={() => console.log("Run ClusterONE")}
                    classname={"runClusterOneButton"}
                />

                <RunFunctionButton
                    label="Select our PPI"
                    icon="fa fa-search"
                    onClickFunction={() => console.log("Explore PPI")}
                    classname={"explorePpiButton"}
                />
                <RunFunctionButton
                    label="Use your PPI"
                    icon="fa fa-upload"
                    onClickFunction={() => console.log("Explore PPI")}
                    classname={"explorePpiButton"}
                />
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