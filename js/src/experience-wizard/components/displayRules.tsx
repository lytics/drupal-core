import React from "react";
import { Stack } from "@mui/material";
import { SelectInput } from "../components/form/select";
import { NumberedSection } from "../components/form/numberedSection";
import { TextInput } from "../components/form/input";
import { SelectMultipleInput } from "../components/form/selectMultiple";
import { ConditionGroup } from "../components/form/conditionGroup";
import { SectionHeader } from "../components/form/sectionHeader";
import {
  layout,
  displayConditions,
  hideAfter,
  pageVisits,
  scrollPercentageToDisplay,
  showDelay,
  showOnExitIntent,
  impressionsGlobalDuration,
  impressionsGlobalSession,
  impressionsGlobalTotal,
  impressionsWidgetDuration,
  impressionsWidgetSession,
  impressionsWidgetTotal,
  hideAfterActionClosedHideCount,
  hideAfterActionClosedHideDuration,
  hideAfterActionConfirmHideCount,
  hideAfterActionConfirmHideDuration,
  hideAfterActionCancelHideCount,
  hideAfterActionCancelHideDuration,
} from "../data/pfa-fields";

interface DisplayRulesSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
  spacing?: number;
}

export const DisplayRulesSection: React.FC<DisplayRulesSectionProps> = ({
  formValues,
  handleChange,
  formFieldVisibility,
  spacing = 3,
  isFieldSet,
}) => {
  const fieldValueContains = (
    field: string,
    value: string | string[]
  ): boolean => {
    const values = Array.isArray(value) ? value : [value];
    return values.some((v) => {
      const fieldValue = formValues[field];
      const fieldValueArray = fieldValue?.split(",");

      // iterate through fieldValueArray and look for exact match
      return fieldValueArray.some((fv) => fv === v);

      // return typeof fieldValue === "string" && fieldValue.includes(v);
    });
  };

  return (
    <NumberedSection
      number={5}
      headline={
        "Are there any other special conditions you'd like your experience to display under?"
      }
    >
      {!isFieldSet(layout.id) && <>Layout not set.</>}
      {isFieldSet(layout.id) && (
        <>
          <SelectMultipleInput
            field={displayConditions}
            position="default"
            visible={isFieldSet(layout.id)}
            formValues={formValues}
            handleChange={handleChange}
          />

          {isFieldSet(displayConditions.id) && (
            <Stack
              mt={3}
              p={0}
              spacing={5}
              sx={{
                flex: 1,
                // borderLeft: "5px solid #E0E0E0",
                // borderRight: "5px solid #E0E0E0",
                // backgroundColor: "#FFF",
              }}
            >
              {fieldValueContains(displayConditions.id, [
                hideAfter.id,
                pageVisits.id,
                scrollPercentageToDisplay.id,
                showDelay.id,
                showOnExitIntent.id,
              ]) && (
                <Stack spacing={spacing}>
                  <SectionHeader
                    variation="secondary"
                    headline={"General engagement and delay based conditions."}
                    description={
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar sed enim ac maximus. Vivamus dui ligula, blandit vel est id, pellentesque dapibus tortor. Proin quis ullamcorper ex, tincidunt egestas orci."
                    }
                  />

                  <Stack spacing={spacing} direction={"column"}>
                    <TextInput
                      field={hideAfter}
                      type="number"
                      visible={fieldValueContains(
                        displayConditions.id,
                        hideAfter.id
                      )}
                      formValues={formValues}
                      handleChange={handleChange}
                      size="small"
                    />

                    <TextInput
                      field={pageVisits}
                      type="number"
                      visible={fieldValueContains(
                        displayConditions.id,
                        pageVisits.id
                      )}
                      formValues={formValues}
                      handleChange={handleChange}
                      size="small"
                    />

                    <TextInput
                      field={scrollPercentageToDisplay}
                      type="number"
                      visible={fieldValueContains(
                        displayConditions.id,
                        scrollPercentageToDisplay.id
                      )}
                      formValues={formValues}
                      handleChange={handleChange}
                      size="small"
                    />

                    <TextInput
                      field={showDelay}
                      type="number"
                      visible={fieldValueContains(
                        displayConditions.id,
                        showDelay.id
                      )}
                      formValues={formValues}
                      handleChange={handleChange}
                      size="small"
                    />

                    <SelectInput
                      field={showOnExitIntent}
                      position="default"
                      visible={fieldValueContains(
                        displayConditions.id,
                        showOnExitIntent.id
                      )}
                      formValues={formValues}
                      handleChange={handleChange}
                    />
                  </Stack>
                </Stack>
              )}

              {fieldValueContains(displayConditions.id, "impressions") && (
                <Stack spacing={3}>
                  <SectionHeader
                    variation="secondary"
                    headline={"Hide after receiving impressions?"}
                    description={
                      "Impression settings applied globally will result in all experience interactions contributing to the logic. For instance, if you have three experiences running and a visitors sees each of them once, that will result in 3 total global impressions."
                    }
                  />
                  <Stack spacing={spacing} direction={"row"}>
                    <ConditionGroup spacing={spacing} label={"Widget"}>
                      <TextInput
                        field={impressionsWidgetSession}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsWidgetSession.id] ||
                          !impressionsWidgetSession.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={impressionsWidgetTotal}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsWidgetTotal.id] ||
                          !impressionsWidgetTotal.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={impressionsWidgetDuration}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsWidgetDuration.id] ||
                          !impressionsWidgetDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                    </ConditionGroup>

                    <ConditionGroup spacing={spacing} label={"Global"}>
                      <TextInput
                        field={impressionsGlobalSession}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsGlobalSession.id] ||
                          !impressionsGlobalSession.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                      <TextInput
                        field={impressionsGlobalTotal}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsGlobalTotal.id] ||
                          !impressionsGlobalTotal.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                      <TextInput
                        field={impressionsGlobalDuration}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsGlobalDuration.id] ||
                          !impressionsGlobalDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                    </ConditionGroup>
                  </Stack>
                </Stack>
              )}

              {fieldValueContains(displayConditions.id, "hideAfterAction") && (
                <Stack spacing={3}>
                  <SectionHeader
                    variation="secondary"
                    headline={"Hide after specific actions?"}
                    description={
                      "Impression settings applied globally will result in all experience interactions contributing to the logic. For instance, if you have three experiences running and a visitors sees each of them once, that will result in 3 total global impressions."
                    }
                  />
                  <Stack spacing={spacing} direction={"row"}>
                    <ConditionGroup
                      spacing={spacing}
                      label={"After Closing Experience"}
                    >
                      <TextInput
                        field={hideAfterActionClosedHideCount}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionClosedHideCount.id
                          ] || !hideAfterActionClosedHideCount.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                      <TextInput
                        field={hideAfterActionClosedHideDuration}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionClosedHideDuration.id
                          ] || !hideAfterActionClosedHideDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </ConditionGroup>
                    <ConditionGroup
                      spacing={spacing}
                      label={"After Pressing Confirm"}
                    >
                      <TextInput
                        field={hideAfterActionConfirmHideCount}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionConfirmHideCount.id
                          ] || !hideAfterActionConfirmHideCount.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />

                      <TextInput
                        field={hideAfterActionConfirmHideDuration}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionConfirmHideDuration.id
                          ] || !hideAfterActionConfirmHideDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </ConditionGroup>
                    <ConditionGroup
                      spacing={spacing}
                      label={"After Pressing Cancel"}
                    >
                      <TextInput
                        field={hideAfterActionCancelHideCount}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionCancelHideCount.id
                          ] || !hideAfterActionCancelHideCount.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />

                      <TextInput
                        field={hideAfterActionCancelHideDuration}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionCancelHideDuration.id
                          ] || !hideAfterActionCancelHideDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </ConditionGroup>
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}
        </>
      )}
    </NumberedSection>
  );
};
