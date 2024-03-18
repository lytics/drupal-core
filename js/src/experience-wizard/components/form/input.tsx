import React from "react";
import { FormControl, InputLabel, InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Field } from "../../form-fields";

export interface TextInputProps {
  field: Field;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const TextInputStyled = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#FFF",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    padding: "10px 12px",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const TextInput: React.FC<TextInputProps> = (textInputProps) => {
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
      <TextInputStyled
        key={field.id}
        id={field.id}
        value={formValues[field.id] || ""}
        onChange={(e) => handleChange(field.id, e.target.value)}
        required={field.required}
      />
    </FormControl>
  );
};
