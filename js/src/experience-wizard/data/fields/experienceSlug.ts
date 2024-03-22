import { Field } from "../pfa-fields";

export const ExperienceSlug: Field = {
  id: "experienceSlug",
  label: "Experience Identifier",
  description:
    "A unique value to represent this experience. No spaces or special characters outside of hyphens and underscores allowed (example: my_campaign_2024).",
  type: "string",
  method: "input",
  required: true,
  hidden: false,
  render: "config.id",
};
