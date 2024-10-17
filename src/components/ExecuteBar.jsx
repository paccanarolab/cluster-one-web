import React from "react";
import { InitialView } from "./InitialView.jsx";
import { Layout } from "./Layout.jsx";
import { ProteinFilter } from "./ProteinFilter.jsx";
import { AppContext } from "./AppContext.jsx";
import { HighLightCheckboxLabels } from "./HighLightCheckboxLabels.jsx";
import "../styles/ExecuteBar.scss";
import "../styles/RunFunctionButton.scss";

const ExecuteBar = () => {
  const {
    ppiId,
    organismName,
    ppiLabel,
    cyGraph,
  } = React.useContext(AppContext);

  return (
    <div
      className="config"
      id="config"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 10px", // Adjusted padding to center vertically and horizontally
        position: "relative",
        height: "55px",
      }}
    >
      {/* InitialView - Positioned on the left */}
      <div
        style={{
          marginRight: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InitialView classname={"initialbutton"} />
      </div>

      {/* ClusterONE Web */}
      <div
        style={{
          fontSize: "30px",
          marginRight: "20px",
          lineHeight: "55px", // Ensures the text is vertically centered
          cursor: 'pointer',
        }}
        onClick={() => {
          window.open(`https://www.paccanarolab.org/`, '_blank');
        }}
      >
        PaccanaroLab
      </div>
      {/* ClusterONE Web */}
      <div
        style={{
          fontSize: "20px",
          marginRight: "20px",
          lineHeight: "55px", // Ensures the text is vertically centered
        }}
      >
        ClusterONE Web
      </div>


      {/* Organism */}
      {organismName && (
        <div
          style={{
            marginRight: "20px",
            fontSize: "15px",
            lineHeight: "55px", // Ensures the text is vertically centered
          }}
        >
          <strong>Organism: </strong>{organismName}
        </div>
      )}

      {/* PPI */}
      {ppiId && (
        <div
          style={{
            marginRight: "20px",
            fontSize: "15px",
            lineHeight: "55px", // Ensures the text is vertically centered
          }}
        >
          <strong>PPI: </strong>{ppiLabel}
        </div>
      )}

      {/* Protein Filter */}
      {cyGraph.code && (
        <div style={{ marginRight: "20px" }}>
          <ProteinFilter />
        </div>
      )}

      {/* HighLightCheckboxLabels */}
      {cyGraph.code && (
        <div
          key={cyGraph.code}
          style={{
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HighLightCheckboxLabels label={"Highlight overlapping proteins"} />
        </div>
      )}

      {/* Layout */}
      {cyGraph.code && (
        <div style={{ marginRight: "20px", display: "flex", alignItems: "center" }}>
          <Layout />
        </div>
      )}
    </div>
  );
};

export { ExecuteBar };