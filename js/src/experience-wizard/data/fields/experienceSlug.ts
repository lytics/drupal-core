import { Field } from "../pfa-fields";

export const ExperienceSlug: Field = {
  id: "experienceSlug",
  label: "Experience Identifier",
  description: "A unique ID for your experience (my_campaign_2024).",
  type: "string",
  method: "input",
  required: true,
  hidden: false,
  render: "config.id",
};
