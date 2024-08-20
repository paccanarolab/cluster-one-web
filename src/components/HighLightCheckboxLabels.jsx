import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppContext } from "./AppContext";

const HighLightCheckboxLabels = ({ label, style }) => {
  const { showHighlight, setShowHighlight } = React.useContext(AppContext);

  const [checked, setChecked] = React.useState(showHighlight);

  const handleChange = (event) => {
    console.log("Handle change", event.target.checked);
    setShowHighlight(event.target.checked);
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    console.log("Effect running: showHighlight", showHighlight);
    setChecked(showHighlight);
  }, [showHighlight]);

  return (
    <FormGroup style={style}>
      <FormControlLabel
        control={
          <Checkbox color="secondary" checked={checked} onChange={handleChange} />
        }
        label={label}
      />
    </FormGroup>
  );
}

export { HighLightCheckboxLabels };
