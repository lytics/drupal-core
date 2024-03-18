import React from "react";
import { FormControl, InputLabel } from "@mui/material";
import { Field } from "../../form-fields";

export interface ColorInputProps {
  field: Field;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const ColorInput: React.FC<ColorInputProps> = (colorInputProps) => {
  const { field, formValues, handleChange } = colorInputProps;

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
      <input
        type="color"
        id={field.id}
        value={formValues[field.id] || ""}
        onChange={(e) => handleChange(field.id, e.target.value)}
        required={field.required}
      />
    </FormControl>
  );
};
