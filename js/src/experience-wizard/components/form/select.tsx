import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Field } from "../../form-fields";

export interface SelectInputProps {
  field: Field;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const SelectInputStyled = styled(MuiSelect)(({ theme }) => ({
  "& .MuiSelect-select": {
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

export const SelectInput: React.FC<SelectInputProps> = (selectInputProps) => {
  const { field, formValues, handleChange } = selectInputProps;

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
      <SelectInputStyled
        labelId={`${field.id}-label`}
        id={field.id}
        value={formValues[field.id] || ""}
        onChange={(e) => handleChange(field.id, e.target.value as string)}
        required={field.required}
      >
        {field.options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </SelectInputStyled>
    </FormControl>
  );
};
