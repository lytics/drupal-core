import { Field, SelectOption } from "../pfa-fields";

const OptionModal: SelectOption = {
  label: "Modal",
  value: "modal",
};

const OptionSlideout: SelectOption = {
  label: "Slideout",
  value: "slideout",
};

const OptionBar: SelectOption = {
  label: "Bar",
  value: "bar",
};

const OptionButton: SelectOption = {
  label: "Button",
  value: "button",
};

const OptionInline: SelectOption = {
  label: "Inline",
  value: "inline",
};

const getSelectOptions = (type: string): SelectOption[] => {
  switch (type) {
    case "message":
      return [
        OptionModal,
        OptionSlideout,
        OptionBar,
        // OptionButton,
        // OptionInline,
      ];
    case "form":
      return [
        OptionModal,
        OptionSlideout,
        // OptionInline,
      ];
    case "subscription":
      return [
        OptionModal,
        OptionSlideout,
        OptionBar,
        // OptionInline,
      ];
    case "gate":
      return [];
    default:
      return [];
  }
};

export const Layout: Field = {
  id: "layout",
  label: "Layout",
  description: "The layout of the component",
  order: 2,
  type: "string",
  method: "select",
  required: true,
  hidden: false,
  dependencies: [
    {
      value: "modal",
      fieldsToShow: ["variant", "image", "positionSelector"],
    },
    {
      value: "slideout",
      fieldsToShow: [
        "variant",
        "image",
        "position",
        "positionSelector",
        "origin",
      ],
    },
    {
      value: "bar",
      fieldsToShow: ["variant", "image", "position", "positionSelector"],
    },
    {
      value: "button",
      fieldsToShow: ["position", "positionSelector"],
    },
    {
      value: "inline",
      fieldsToShow: ["variant", "image", "positionSelector"],
    },
  ],
  render: "config.layout",
};

export const LayoutWithOptions: (type: string) => Field = (type: string) => {
  let payload = Layout;
  payload.options = getSelectOptions(type);
  return payload;
};