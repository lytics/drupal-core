import { Field } from "../pfa-fields";
import { SelectOption } from "../pfa-fields";

const OptionDraft: SelectOption = {
  label: "Draft",
  value: "draft",
};

const OptionReview: SelectOption = {
  label: "Review",
  value: "review",
};

const OptionPublished: SelectOption = {
  label: "Published",
  value: "published",
};

export const ExperienceStatus: Field = {
  id: "experienceStatus",
  label: "Status",
  // description: "Is this experience a draft or should it be published?",
  type: "array",
  method: "input",
  options: [OptionDraft, OptionReview, OptionPublished],
  required: true,
  hidden: false,
  render: "details.status",
};
