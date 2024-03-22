import { Field } from "../pfa-fields";

export const PositionSelector: Field = {
  id: "positionSelector",
  label: "Position Selector",
  description:
    "DOM selector of the parent element you would like to insert the experience into.",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.positionSelector",
};
