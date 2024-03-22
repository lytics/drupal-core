import { Field } from "../pfa-fields";

export const ExperienceDescription: Field = {
  id: "experienceDescription",
  label: "Description",
  description:
    "Describe your experience for improved context and understanding in the future.",
  type: "string",
  method: "textarea",
  required: true,
  hidden: false,
  render: "details.description",
};
