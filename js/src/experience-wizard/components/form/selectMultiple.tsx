import React, { useEffect } from "react";
import {
  Checkbox,
  ListItemText,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface SelectMultipleInputProps {
  field: Field;
  visible: boolean;
  position: string;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const SelectMultipleInput: React.FC<SelectMultipleInputProps> = (
  selectMultipleInputProps
) => {
  const { field, formValues, handleChange, position, visible } =
    selectMultipleInputProps;

  const [activeConditions, setActiveConditions] = React.useState<string[]>([]);

  useEffect(() => {
    if (formValues[field.id]) {
      setActiveConditions(formValues[field.id].split(","));
    }
  }, [formValues]);

  const handleSelectCheckChange = (
    fieldId: string,
    value: string | string[]
  ) => {
    const stringValue = typeof value === "string" ? value : value.join(",");
    handleChange(fieldId, stringValue);
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
            multiple
            value={activeConditions}
            onChange={(e) => handleSelectCheckChange(field.id, e.target.value)}
            // onChange={(e) => handleChangeConditions(e, field.id)}
            required={field.required}
            renderValue={(selected) => {
              // const selectedOption = field.options?.find(
              //   (option) => option.value === selected
              // );
              // return selectedOption?.label || "";
              return selected.join(", ");
            }}
            //     MenuProps={MenuProps}
            // >
            //   {names.map((name) => (
            //     <MenuItem key={name} value={name}>
            //       <Checkbox checked={personName.indexOf(name) > -1} />
            //       <ListItemText primary={name} />
            //     </MenuItem>
            //   ))}
            sx={{
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
                <Checkbox
                  checked={activeConditions.indexOf(option.value) > -1}
                />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{field.description || undefined}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};
