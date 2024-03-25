import { Field } from "../pfa-fields";

export const ExperienceTitle: Field = {
  id: "experienceTitle",
  label: "Label",
  description:
    "Create a label for your experience so that you can easily identify it later.",
  type: "string",
  method: "input",
  required: true,
  hidden: false,
  render: "details.label",
};
