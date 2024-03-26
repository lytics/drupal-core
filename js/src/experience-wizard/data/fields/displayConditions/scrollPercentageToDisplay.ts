import { Field } from "../../pfa-fields";

export const ScrollPercentageToDisplay: Field = {
  id: "scrollPercentageToDisplay",
  label:
    "Wait for visitor to scroll (0-100)% of the page before showing experience?",
  description:
    "Define the percentage of the page that must be scrolled to before showing the experience.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.scrollPercentageToDisplay",
};
