import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface URLContainsItem {
  match: string;
  value: string;
}

export interface MatchValueFormProps {
  field: Field;
  visible: boolean;
  formValues: { [key: string]: any };
  handleChange: (id: string, value: URLContainsItem[]) => void;
}

export const URLContainsBuilder: React.FC<MatchValueFormProps> = ({
  field,
  visible,
  formValues,
  handleChange,
}) => {
  const [items, setItems] = useState([{ match: "simple", value: "" }]);

  const handleMatchChange = (index, event) => {
    const newItems = [...items];
    newItems[index].match = event.target.value;
    setItems(newItems);
  };

  const handleValueChange = (index, event) => {
    const newItems = [...items];
    newItems[index].value = event.target.value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { match: "simple", value: "" }]);
  };

  useEffect(() => {
    const formattedItems = items.map((item) => ({
      match: item.match,
      value: item.value,
    })) as URLContainsItem[];

    // console.log(formattedItems);
    handleChange(field.id, formattedItems);
  }, [items]);

  return (
    <Box>
      {items.map((item, index) => (
        <Box key={index}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={`match-label-${index}`}>Match</InputLabel>
            <Select
              labelId={`match-label-${index}`}
              id={`match-select-${index}`}
              value={item.match}
              onChange={(event) => handleMatchChange(index, event)}
            >
              <MenuItem value="simple">Simple</MenuItem>
              <MenuItem value="exact">Exact</MenuItem>
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="regex">Regex</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Value"
            value={item.value}
            onChange={(event) => handleValueChange(index, event)}
            sx={{ m: 1 }}
          />
        </Box>
      ))}
      <Button variant="contained" onClick={handleAddItem} sx={{ mt: 2 }}>
        Add Item
      </Button>
    </Box>
  );
};
