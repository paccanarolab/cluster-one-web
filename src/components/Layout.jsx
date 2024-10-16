import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext.jsx";
import { TextField, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const AvailableLayouts = [
  {
    name: "random",
    fit: true,
    idealEdgeLength: function (edge) {
      if (
        edge.data("source").type === "proteinComplex" ||
        edge.data("target").type === "proteinComplex"
      ) {
        return 500;
      }
      return 200;
    },
    directed: true,
    padding: 50,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  },
  {
    name: "grid",
    fit: true,
    padding: 30,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  },
  {
    name: "circle",
    fit: true,
    padding: 30,
    sort: function (a, b) {
      return a.degree() - b.degree();
    },
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    idealEdgeLength: function (edge) {
      if (
        edge.data("source").type === "proteinComplex" ||
        edge.data("target").type === "proteinComplex"
      ) {
        return 500;
      }
      return 200;
    },
  },
  {
    name: "concentric",
    fit: true,
    minNodeSpacing: 50,
    equidistant: false,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    idealEdgeLength: function (edge) {
      if (
        edge.data("source").type === "proteinComplex" ||
        edge.data("target").type === "proteinComplex"
      ) {
        return 500;
      }
      return 200;
    },
  },
  {
    name: "breadthfirst",
    fit: true,
    directed: true,
    padding: 30,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    idealEdgeLength: function (edge) {
      if (
        edge.data("source").type === "proteinComplex" ||
        edge.data("target").type === "proteinComplex"
      ) {
        return 500;
      }
      return 200;
    },
  },
  {
    name: "cose",
    idealEdgeLength: function (edge) {
      if (
        edge.data("source").type === "proteinComplex" ||
        edge.data("target").type === "proteinComplex"
      ) {
        return 500;
      }
      return 200;
    },
    refresh: 20,
    fit: true,
    padding: 40,
    randomize: false,
    componentSpacing: 300,
    nodeRepulsion: 8000000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0,
    animate: true,
    minNodeSpacing: 100,
    avoidOverlap: true,
  },
];

const Layout = () => {
  const { layout, setLayout } = React.useContext(AppContext);
  const [layoutSelected, setLayoutSelected] = useState("");

  const handleChangeLayout = (event) => {
    const selectedValue = event.target.value;
    const selectedLayout = AvailableLayouts.find(
      (layoutOption) => layoutOption.name === selectedValue
    );
    if (selectedLayout) {
      setLayout(selectedLayout);
      setLayoutSelected(selectedValue);
    }
  };

  useEffect(() => {
    if (layout) {
      setLayoutSelected(layout.name);
    }
  }, [layout]);

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      label="Layout"
      value={layoutSelected}
      onChange={handleChangeLayout}
      style={{
        width: '200px',
        zIndex: 1100,
        position: 'relative',
        backgroundColor: '#444444', // Darker input background
        borderRadius: '5px',
      }}
      InputProps={{
        startAdornment: (
          <SearchIcon style={{ marginRight: '8px', color: '#FFFFFF' }} />
        ),
        style: {
          color: '#FFFFFF', // White text inside the input
        },
      }}
      InputLabelProps={{
        style: { color: '#FFFFFF' }, // White label text
      }}
    >
      <MenuItem value="" disabled>
        Select a Layout
      </MenuItem>
      {AvailableLayouts.map((layoutOption, index) => (
        <MenuItem key={index} value={layoutOption.name}>
          {layoutOption.name.toUpperCase()}
        </MenuItem>
      ))}
    </TextField>
  );
};

export { Layout };
