import { Field } from "../../pfa-fields";

export const ScrollPercentageToDisplay: Field = {
  id: "scrollPercentageToDisplay",
  label: "Percentage of page scrolled before displaying?",
  description:
    "Display the experience only after the visitor has scrolled down past a certain percentage of the page.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.scrollPercentageToDisplay",
};
