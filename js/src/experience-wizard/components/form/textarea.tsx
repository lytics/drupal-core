import { TextField, FormControl, InputLabel } from "@mui/material";
import { Field } from "../../form-fields";
import React from "react";

export interface TextAreaProps {
  field: Field;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const TextAreaInput: React.FC<TextAreaProps> = (textAreaProps) => {
  const { field, formValues, handleChange } = textAreaProps;

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
      <TextField
        key={field.id}
        id={field.id}
        value={formValues[field.id] || ""}
        onChange={(e) => handleChange(field.id, e.target.value)}
        required={field.required}
        multiline
        rows={4}
      />
    </FormControl>
  );
};
