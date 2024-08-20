import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppContext } from "./AppContext.jsx";


const CheckboxLabels = ({label, style}) => {
  const { showWeight, setShowWeight } = React.useContext(AppContext);
  
  const [checked, setChecked] = React.useState(showWeight);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setShowWeight(event.target.checked);
  };

  React.useEffect(() => {
    setChecked(showWeight);
  }, [showWeight]);

  return (
    <FormGroup 
      style={style}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="secondary"
          />
        }
        label={label}
      />
    </FormGroup>
  );
}

export { CheckboxLabels }
