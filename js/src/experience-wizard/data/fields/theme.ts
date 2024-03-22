import { Field } from "../pfa-fields";

export const Theme: Field = {
  id: "theme",
  label: "Theme",
  description: "The theme to use for the message",
  order: 10,
  type: "string",
  method: "select",
  options: [
    {
      label: "Dark",
      value: "dark",
    },
    {
      label: "Light",
      value: "light",
    },
    {
      label: "Custom",
      value: "custom",
    },
  ],
  required: true,
  hidden: false,
  dependencies: [
    {
      value: "custom",
      fieldsToShow: [
        "backgroundColor",
        "textColor",
        "closeColor",
        "actionBackgroundColor",
        "actionTextColor",
        "cancelBackgroundColor",
        "cancelTextColor",
        "fieldBackgroundColor",
      ],
    },
  ],
  render: "config.theme",
};
