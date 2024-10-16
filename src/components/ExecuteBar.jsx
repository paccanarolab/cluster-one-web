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
        flexWrap: "wrap",
        padding: "10px",
		position: "relative",
      }}
    >
      {/* ClusterONE Web */}
      <div
        style={{
          fontSize: "35px",
          marginRight: "24px",
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
          }}
        >
		<strong>PPI: </strong>{ppiLabel}
        </div>
      )}
      
	  {/* Protein Filter */}
      {cyGraph.code && (
        <div style={{ marginRight: "20px"}}>
          <ProteinFilter />
        </div>
      )}

      {/* HighLightCheckboxLabels */}
      {cyGraph.code && (
        <div
			key={cyGraph.code}
          style={{
            marginRight: "20px",
          }}
        >
          <HighLightCheckboxLabels label={"Highlight overlapping proteins"} />
        </div>
      )}

      {/* Layout */}
      {cyGraph.code && (
		<div style={{ marginRight: "20px"}}>
		  <Layout />
		</div>
	  )}


      {/* InitialView - Positioned on the right */}
      <div
        style={{
          position: "absolute",
          right: "5px",
		  marginTop: "10px",
        }}
      >
        <InitialView
          classname={"initialbutton"}
        />
      </div>
    </div>
  );
};

export { ExecuteBar };
