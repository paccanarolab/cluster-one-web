import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppContext } from "./AppContext";

const CheckboxLabels = () => {
  const { setShowHighlight } = React.useContext(AppContext);
  return (
    <FormGroup 
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        margin: "10px",
        zIndex: "1000",
        top: "3%",
        left: "38%",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox 
            color="secondary"
          />
        }
        label="Highlight overlapping proteins"
        onChange={(event) => {
          console.log("CheckboxLabels: ", event.target.checked);
          setShowHighlight(event.target.checked)
        }}
      />
    </FormGroup>
  );
}

export { CheckboxLabels }
