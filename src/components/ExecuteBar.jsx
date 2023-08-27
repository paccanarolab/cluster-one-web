const ExecuteBar = () => {
    return (
        <div className="execute-bar">
            <span className="fa fa-bars config-toggle" id="config-toggle"></span>
            <div className="config" id="config">
                <span className="label label-default">Cluster One Web</span>
                <p> Cluster ONE WEB Manipulation and Analysis clusters </p>
                <button className="btn btn-default" id="execute">
                    <span className="fa fa-play"></span>
                    Execute
                </button>
                <button className="btn btn-default" id="stop">
                    <span className="fa fa-stop"></span>
                    Stop
                </button>
                <button className="btn btn-default" id="reset">
                    <span className="fa fa-refresh"></span>
                    Reset
                </button>
            </div>
        </div>
    );
}

export { ExecuteBar };