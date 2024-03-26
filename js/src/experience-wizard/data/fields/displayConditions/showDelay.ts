import { Field } from "../../pfa-fields";

export const ShowDelay: Field = {
  id: "showDelay",
  label: "Wait (seconds) before showing experience?",
  description:
    "Define the number of seconds that must elapse before the experience will be surfaced.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.showDelay",
};
