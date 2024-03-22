import { Field } from "../../pfa-fields";

export const URLContains: Field = {
  id: "urlContains",
  label: "Hide experience after (seconds)?",
  description:
    "Automatically hide the experience after a certain number of seconds have elapsed.",
  type: "array",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.urlContains",
};
