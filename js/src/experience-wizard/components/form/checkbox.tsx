import React from "react";
import { FormControl, InputLabel, Checkbox } from "@mui/material";
import { Field } from "../../form-fields";

export interface CheckboxInputProps {
  field: Field;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = (textInputProps) => {
  const { field, formValues, handleChange } = textInputProps;

  return (
    <FormControl
      id={`field-${field.id}`}
      key={field.id}
      variant="standard"
      className={field.hidden ? "hidden" : ""}
    >
      <InputLabel shrink htmlFor={field.id}>
        {field.label}
      </InputLabel>
      <Checkbox
        id={field.id}
        checked={formValues[field.id] === "true"}
        onChange={(e) => handleChange(field.id, e.target.checked.toString())}
        required={field.required}
      />
    </FormControl>
  );
};
