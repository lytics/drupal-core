import { Field } from "../../pfa-fields";

export const ShowDelay: Field = {
  id: "showDelay",
  label: "Wait to show experience (seconds)?",
  description:
    "Wait a certain number of seconds before showing the experience to the visitor.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.showDelay",
};
