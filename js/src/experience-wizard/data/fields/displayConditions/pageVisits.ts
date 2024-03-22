import { Field } from "../../pfa-fields";

export const PageVisits: Field = {
  id: "pageVisits",
  label: "Require previous page visits?",
  description:
    "Display the experience only after the visitor has visited a certain number of pages.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.pageVisits",
};
