import React, { useEffect, useState } from "react";
import { SelectInput } from "../components/form/select";
import { ColorInput } from "../components/form/color";
import { NumberedSection } from "../components/form/numberedSection";
import { ColorPicker } from "../components/form/colorPicker";

import {
  theme,
  textColor,
  headlineColor,
  closeColor,
  actionBackgroundColor,
  actionTextColor,
  cancelBackgroundColor,
  cancelTextColor,
  fieldBackgroundColor,
} from "../data/pfa-fields";

interface BrandingSectionProps {
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
}

export const BrandingSection: React.FC<BrandingSectionProps> = ({
  formValues,
  handleChange,
  formFieldVisibility,
}) => {
  return (
    <NumberedSection
      number={4}
      headline={
        "How would you like to configure the design of your experience?"
      }
    >
      <SelectInput
        field={theme}
        visible={formFieldVisibility[theme.id] || !theme.hidden}
        position={"default"}
        formValues={formValues}
        handleChange={handleChange}
      />

      <ColorPicker>
        <ColorInput
          field={textColor}
          visible={formFieldVisibility[textColor.id] || !textColor.hidden}
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={headlineColor}
          visible={
            formFieldVisibility[headlineColor.id] || !headlineColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={closeColor}
          visible={formFieldVisibility[closeColor.id] || !closeColor.hidden}
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={actionBackgroundColor}
          visible={
            formFieldVisibility[actionBackgroundColor.id] ||
            !actionBackgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={actionTextColor}
          visible={
            formFieldVisibility[actionTextColor.id] || !actionTextColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={cancelBackgroundColor}
          visible={
            formFieldVisibility[cancelBackgroundColor.id] ||
            !cancelBackgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={cancelTextColor}
          visible={
            formFieldVisibility[cancelTextColor.id] || !cancelTextColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={fieldBackgroundColor}
          visible={
            formFieldVisibility[fieldBackgroundColor.id] ||
            !fieldBackgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />
      </ColorPicker>
    </NumberedSection>
  );
};
