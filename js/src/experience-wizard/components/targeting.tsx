import React from "react";
import {
  URLContainsBuilder,
  URLContainsItem,
} from "../components/form/urlContains";

import { type, urlContains } from "../data/pfa-fields";

import { NumberedSection } from "../components/form/numberedSection";

interface TargetingSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: URLContainsItem[]) => void;
}

export const TargetingSection: React.FC<TargetingSectionProps> = ({
  formValues,
  handleChange,
  isFieldSet,
}) => {
  return (
    <NumberedSection
      number={2}
      headline={"Where would you like your experience to be displayed?"}
    >
      <URLContainsBuilder
        field={urlContains}
        visible={isFieldSet(type.id)}
        formValues={formValues}
        handleChange={handleChange}
      />
    </NumberedSection>
  );
};
