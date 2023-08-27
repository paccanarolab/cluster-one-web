import React from "react";

const ExecuteBar = () => {
    return (
            <div className="config" id="config">
                <span className="fa fa-bars config-toggle" id="config-toggle"></span>
                <span className="label label-default">ClusterONE WEB</span>
                <p>Manipulation and Analysis clusters</p>       
                <ul>
                        <button 
                            className="btn btn-default"
                            id="quick_run"
                            onClick={
                                () => {console.log("Quick Run");}
                            }
                        >
                            <span className="fa fa-play"></span>
                            Quick Run
                        </button>
                        <button className="btn btn-default" id="run">
                            <span className="fa fa-play"></span>
                            Run
                        </button>
                        <button className="btn btn-default" id="reset">
                            <span className="fa fa-refresh"></span>
                            Reset
                        </button>
                </ul>
            </div>
    );
}

export { ExecuteBar };