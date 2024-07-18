import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


const CheckboxLabels = ({label, onChangeFunc, style, checked }) => {
  return (
    <FormGroup 
      style={style}
    >
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={false}
            checked={true ? checked : false}
            color="secondary"
          />
        }
        label={label}
        onChange={onChangeFunc}
      />
    </FormGroup>
  );
}

export { CheckboxLabels }
