import React from "react";
import { TextField } from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface TextInputProps {
  field: Field;
  visible: boolean;
  inputProps?: any;
  size?: "small" | "medium" | undefined;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = (textInputProps) => {
  const { field, formValues, handleChange, visible, size, inputProps } =
    textInputProps;

  if (visible) {
    // console.log("field", field.id, visible);
  }

  const handleInputChange = (fieldId, value) => {
    let cleansedValue = value;

    if (inputProps) {
      cleansedValue = cleansedValue.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    }

    handleChange(fieldId, cleansedValue);
  };

  return (
    <>
      {visible && (
        <TextField
          variant="outlined"
          label={field.label}
          key={field.id}
          id={field.id}
          size={size}
          inputProps={inputProps}
          value={formValues[field.id] || ""}
          onChange={(e) => handleInputChange(field.id, e.target.value)}
          required={field.required}
          helperText={field.description || undefined}
          sx={{
            "& .MuiInputBase-input": {
              backgroundColor: "#FFF",
              "&:focus": {
                boxShadow: "none",
                borderColor: "none",
              },
            },
          }}
        />
      )}
    </>
  );
};
