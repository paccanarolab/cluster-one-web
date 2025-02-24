import React from "react";
import { InitialView } from "./InitialView.jsx";
import { Layout } from "./Layout.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import { AppContext } from "./AppContext.jsx";
import { HighLightCheckboxLabels } from "./HighLightCheckboxLabels.jsx";
import "../styles/ExecuteBar.scss";

const ExecuteBar = () => {
  const {
    ppiId,
    organismName,
    ppiLabel,
    cyGraph,
    complexCounter,
    setExecuteBarHeight,
  } = React.useContext(AppContext);

  const barRef = React.useRef(null);

  React.useEffect(() => {
    function updateBarHeight() {
      if (barRef.current) {
        setExecuteBarHeight(barRef.current.offsetHeight);
      }
    }
    updateBarHeight();
    window.addEventListener("resize", updateBarHeight);
    return () => window.removeEventListener("resize", updateBarHeight);
  }, [setExecuteBarHeight]);

  return (
    <div className="config" id="config" ref={barRef}>
      <div className="initialbutton-container">
        <InitialView classname="initialbutton" />
      </div>

      <div className="cluster-label">
        ClusterONE Web
      </div>

      {organismName && (
        <div className="organism">
          <strong>Organism: </strong>
          <span title={organismName}>
            {organismName.substring(0, 15) + "..."}
          </span>
        </div>
      )}

      {ppiId && (
        <div className="ppi">
          <strong>PPI: </strong>{ppiLabel} | {complexCounter} complexes
        </div>
      )}
      
      {cyGraph.code && (
        <div className="highlight-checkbox">
          <HighLightCheckboxLabels 
            key={cyGraph.code}
            label="Overlapping proteins" 
          />
        </div>
      )}
      {cyGraph.code && (
        <div className="protein-filter">
          <ProteinFilter />
        </div>
      )}

      {cyGraph.code && (
        <div className="layout-selector">
          <Layout />
        </div>
      )}

      <div
        className="paccanarolab"
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        onClick={() => {
          window.open("https://www.paccanarolab.org/", "_blank");
        }}
      >
        PaccanaroLab
      </div>
    </div>
  );
};

export { ExecuteBar };