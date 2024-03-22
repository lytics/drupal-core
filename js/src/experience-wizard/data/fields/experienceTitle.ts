import { Field } from "../pfa-fields";

export const ExperienceTitle: Field = {
  id: "experienceTitle",
  label: "Label",
  description: "Name your experience for easy access later.",
  type: "string",
  method: "input",
  required: true,
  hidden: false,
  render: "details.label",
};
