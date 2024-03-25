import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface SelectInputProps {
  field: Field;
  visible: boolean;
  position: string;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const SelectInput: React.FC<SelectInputProps> = (selectInputProps) => {
  const { field, formValues, handleChange, position, visible } =
    selectInputProps;

  const renderValue = (selected: string) => {
    if (!selected) {
      return <em>Placeholder</em>;
    }
    return selected;
  };

  return (
    <>
      {visible && (
        <FormControl fullWidth>
          <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
          <Select
            labelId={`${field.id}-label`}
            id={field.id}
            label={field.label}
            value={formValues[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value as string)}
            required={field.required}
            renderValue={(selected) => {
              const selectedOption = field.options?.find(
                (option) => option.value === selected
              );
              return selectedOption?.label || "";
            }}
            sx={{
              width: "100%",
              "& .MuiSelect-select": {
                backgroundColor: "#FFF",
                "&:focus": {
                  boxShadow: "none",
                  borderColor: "none",
                },
              },
            }}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{field.description || undefined}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};
