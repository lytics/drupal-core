import { Field } from "../../pfa-fields";

export const PageVisits: Field = {
  id: "pageVisits",
  label: "Require (number) of page visits before showing experience?",
  description:
    "Define the total number of pages a visitor must have viewed before the experience will be surfaced.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.pageVisits",
};
