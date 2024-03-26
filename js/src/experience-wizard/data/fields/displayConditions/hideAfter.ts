import { Field } from "../../pfa-fields";

export const HideAfter: Field = {
  id: "hideAfter",
  label: "Hide experience after (seconds)?",
  description:
    "Automatically hide this experience after the defined number of seconds have elapsed.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfter",
};
