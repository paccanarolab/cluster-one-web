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
  } = React.useContext(AppContext);

  return (
    <div className="config" id="config">
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
            {organismName.substring(0, 20) + "..."}
          </span>
        </div>
      )}

      {ppiId && (
        <div className="ppi">
          <strong>PPI: </strong>{ppiLabel} {complexCounter} complexes found
        </div>
      )}

      {cyGraph.code && (
        <div className="protein-filter">
          <ProteinFilter />
        </div>
      )}

      {cyGraph.code && (
        <div className="highlight-checkbox">
          <HighLightCheckboxLabels 
            key={cyGraph.code}
            label="Highlight overlapping proteins" 
          />
        </div>
      )}

      {cyGraph.code && (
        <div className="layout-selector">
          <Layout />
        </div>
      )}

      {/* PaccanaroLab: Keep this aligned to the far right */}
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