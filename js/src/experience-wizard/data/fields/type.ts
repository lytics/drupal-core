import { Field } from "../pfa-fields";

export const Type: Field = {
  id: "type",
  label: "Type",
  description: "The type of message to display",
  type: "string",
  method: "select",
  options: [
    {
      label: "Promotional Message",
      value: "message",
    },
    {
      label: "Lead Capture Form",
      value: "form",
    },
  ],
  required: true,
  hidden: false,
  support: ["*"],
  render: "details.type",
};
