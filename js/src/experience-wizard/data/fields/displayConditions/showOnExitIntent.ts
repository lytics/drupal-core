import { Field } from "../../pfa-fields";

export const ShowOnExitIntent: Field = {
  id: "showOnExitIntent",
  label: "Wait to show experience (seconds)?",
  description:
    "Only show the experience when the visitor begins to exit the page.",
  type: "boolean",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.showOnExitIntent",
};
