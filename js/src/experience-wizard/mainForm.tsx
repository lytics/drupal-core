import React, { useEffect, useState, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
// import { PFAFields } from "./data/pfa-fields";

import {
  Field,
  type,
  headline,
  layout,
  layoutWithOptions,
  variant,
  variantWithOptions,
  theme,
  backgroundColor,
  textColor,
  headlineColor,
  closeColor,
  actionBackgroundColor,
  actionTextColor,
  cancelBackgroundColor,
  cancelTextColor,
  fieldBackgroundColor,
  message,
  okShow,
  okMessage,
  cancelShow,
  cancelMessage,
  image,
  positionSelector,
  position,
  positionWithOptions,
  origin,
  originWithOptions,
  pushDown,
  experienceTitle,
  experienceDescription,
  experienceSlug,
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
} from "./data/pfa-fields";

import { TextAreaInput } from "./components/form/textarea";
import { TextInput } from "./components/form/input";
import { CheckboxInput } from "./components/form/checkbox";
import { SelectInput } from "./components/form/select";
import { ColorInput } from "./components/form/color";
import { SelectMultipleInput } from "./components/form/selectMultiple";

const ExperienceWizard: React.FC = () => {
  const [formValues, setFormValues] = useState<{
    [key: string]: string;
  }>({});
  const [formFieldVisibility, setFormFieldVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  const fields: Field[] = [
    type,
    headline,
    layout,
    variant,
    theme,
    backgroundColor,
    textColor,
    headlineColor,
    closeColor,
    actionBackgroundColor,
    actionTextColor,
    cancelBackgroundColor,
    cancelTextColor,
    fieldBackgroundColor,
    message,
    okShow,
    okMessage,
    cancelShow,
    cancelMessage,
    image,
    positionSelector,
    position,
    origin,
    pushDown,
    experienceTitle,
    experienceDescription,
    experienceSlug,
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
    hideAfterActionCancelHideCount,
    hideAfterActionClosedHideDuration,
    hideAfterActionClosedHideCount,
    hideAfterActionConfirmHideCount,
    hideAfterActionConfirmHideDuration,
    hideAfterActionCancelHideCount,
    hideAfterActionCancelHideDuration,
  ];

  const handleChange = (fieldId: string, value: string) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldId]: value,
    }));

    checkDependency(fieldId, value);
  };

  function removeEmptyObjects(object: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];
        if (value && typeof value === "object") {
          removeEmptyObjects(value);
        }
        if (
          (value && typeof value === "object" && !Object.keys(value).length) ||
          value === null ||
          value === undefined
        ) {
          if (Array.isArray(object)) {
            object.splice(Number(key), 1);
          } else {
            delete object[key];
          }
        }
      }
    }
    return object;
  }

  const renderConfiguration = () => {
    let config = {};

    fields.forEach((field) => {
      const renderPath = field.render.split(".");
      const topLevelObject = renderPath.shift();
      if (topLevelObject) {
        config[topLevelObject] = config[topLevelObject] || {};
        let currentObject = config[topLevelObject];
        for (let i = 0; i < renderPath.length - 1; i++) {
          const key = renderPath[i];
          currentObject[key] = currentObject[key] || {};
          currentObject = currentObject[key];
        }
        currentObject[renderPath[renderPath.length - 1]] = formValues[field.id];
      } else {
        console.error("Invalid render path:", field.render);
      }
    });

    config = removeEmptyObjects(config);

    return JSON.stringify(config, null, 2);
  };

  useEffect(() => {
    checkSourceLink();
  }),
    [formValues];

  const checkSourceLink = () => {
    const titleElement = document.getElementById(
      "edit-title"
    ) as HTMLInputElement;
    titleElement.value = formValues[experienceTitle.id] as string;

    const descriptionElement = document.getElementById(
      "edit-description"
    ) as HTMLInputElement;
    descriptionElement.value = formValues[experienceDescription.id] as string;

    const configElement = document.getElementById(
      "edit-configuration"
    ) as HTMLInputElement;
    configElement.value = renderConfiguration();
  };

  const checkDependency = (fieldID: string, value: string) => {
    const field = fields.find((field) => field.id === fieldID);

    if (!field?.dependencies) {
      // console.log("no dependencies");
      return;
    }

    // get all fields to show and hide them initially
    const uniqueFieldsToShow = new Set<string>();
    field.dependencies?.forEach((dependency) => {
      dependency.fieldsToShow.forEach((fieldId: string) => {
        uniqueFieldsToShow.add(fieldId);
      });
    });
    const allFieldsToShow = Array.from(uniqueFieldsToShow);

    // set visibility to false for all fields to show
    allFieldsToShow.forEach((id) => {
      setFormFieldVisibility((prevVisibility) => ({
        ...prevVisibility,
        [id]: false,
      }));
    });

    console.log("checking", fieldID, value);

    let valuesToCheck: string[] = [];
    if (field.type === "array") {
      valuesToCheck = value.split(",");
    } else {
      valuesToCheck = [value];
    }

    valuesToCheck.forEach((v) => {
      // see if there is a dependency where the value matches the value set for the field
      const dependencyMatch = field.dependencies?.find(
        (dependency) => dependency.value === v
      );

      // if there is a match, show the fields
      if (dependencyMatch) {
        dependencyMatch.fieldsToShow.forEach((id) => {
          // console.log("showing field: ", id);
          setFormFieldVisibility((prevVisibility) => ({
            ...prevVisibility,
            [id]: true,
          }));
        });
      }
    });
  };

  useEffect(() => {
    const editConfig = document.getElementById(
      "edit-configuration"
    ) as HTMLInputElement;
    if (editConfig) {
      editConfig.value = renderConfiguration();
    }
  }, [formValues]);

  const isFieldSet = (field: string): boolean => {
    return (
      formValues[field] !== undefined &&
      formValues[field] !== "" &&
      formValues[field] !== "false"
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    // event.preventDefault();
    // const formData: { [key: string]: string } = {};
    // PFAFields.forEach((field) => {
    //   const inputElement = document.getElementById(
    //     field.id
    //   ) as HTMLInputElement;
    //   formData[field.id] = inputElement.value;
    // });
    // console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* details */}
        <Stack spacing={2}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            Experience Details
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae
            commodo lacus. Cras tempus lobortis commodo. Ut consectetur et nulla
            eget porta. Aliquam quis lectus vitae odio egestas varius.
          </Typography>

          <TextInput
            field={experienceTitle}
            visible={
              formFieldVisibility[experienceTitle.id] || !experienceTitle.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />

          <TextAreaInput
            field={experienceDescription}
            visible={
              formFieldVisibility[experienceDescription.id] ||
              !experienceDescription.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />

          <TextInput
            field={experienceSlug}
            visible={
              formFieldVisibility[experienceSlug.id] || !experienceSlug.hidden
            }
            formValues={formValues}
            inputProps={{
              pattern: "[a-z0-9_-]*",
              title:
                "Please enter a valid slug (letters, numbers, underscore, and hyphen)",
            }}
            handleChange={handleChange}
          />
        </Stack>

        {/* type */}
        <Stack mb={3} spacing={1}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            Select Experience Type
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae
            commodo lacus. Cras tempus lobortis commodo. Ut consectetur et nulla
            eget porta. Aliquam quis lectus vitae odio egestas varius.
          </Typography>

          <SelectInput
            field={type}
            position={"default"}
            visible={formFieldVisibility[type.id] || !type.hidden}
            formValues={formValues}
            handleChange={handleChange}
          />
        </Stack>

        {/* display */}
        {isFieldSet(type.id) && (
          <Stack spacing={2}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Configure Experience Messaging
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae
              commodo lacus. Cras tempus lobortis commodo. Ut consectetur et
              nulla eget porta. Aliquam quis lectus vitae odio egestas varius.
            </Typography>

            <TextInput
              field={headline}
              visible={formFieldVisibility[headline.id] || !headline.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />
            <TextAreaInput
              field={message}
              visible={formFieldVisibility[message.id] || !message.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />
            <Stack direction={"row"} spacing={1}>
              <CheckboxInput
                field={okShow}
                visible={formFieldVisibility[okShow.id] || !okShow.hidden}
                formValues={formValues}
                handleChange={handleChange}
              />
              <TextInput
                field={okMessage}
                visible={isFieldSet(okShow.id)}
                size="small"
                formValues={formValues}
                handleChange={handleChange}
              />
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CheckboxInput
                field={cancelShow}
                visible={
                  formFieldVisibility[cancelShow.id] || !cancelShow.hidden
                }
                formValues={formValues}
                handleChange={handleChange}
              />
              <TextInput
                field={cancelMessage}
                visible={isFieldSet(cancelShow.id)}
                size="small"
                formValues={formValues}
                handleChange={handleChange}
              />
            </Stack>
          </Stack>
        )}

        {/* design */}
        {isFieldSet(type.id) && (
          <Stack spacing={2}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Configure Experience Design
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae
              commodo lacus. Cras tempus lobortis commodo. Ut consectetur et
              nulla eget porta. Aliquam quis lectus vitae odio egestas varius.
            </Typography>

            <SelectInput
              field={layoutWithOptions(formValues[type.id])}
              position={"default"}
              visible={isFieldSet(type.id)}
              formValues={formValues}
              handleChange={handleChange}
            />

            <SelectInput
              field={variantWithOptions(formValues[layout.id])}
              position={"default"}
              visible={isFieldSet(layout.id)}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={image}
              visible={formFieldVisibility[image.id] || !image.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={positionSelector}
              visible={
                formFieldVisibility[positionSelector.id] ||
                !positionSelector.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <SelectInput
              field={positionWithOptions(formValues[layout.id])}
              visible={formFieldVisibility[position.id] || !position.hidden}
              position={"default"}
              formValues={formValues}
              handleChange={handleChange}
            />

            <SelectInput
              field={originWithOptions(formValues[layout.id])}
              visible={formFieldVisibility[origin.id] || !origin.hidden}
              position={"default"}
              formValues={formValues}
              handleChange={handleChange}
            />
            <TextInput
              field={pushDown}
              visible={formFieldVisibility[pushDown.id] || !pushDown.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <SelectInput
              field={theme}
              visible={formFieldVisibility[theme.id] || !theme.hidden}
              position={"default"}
              formValues={formValues}
              handleChange={handleChange}
            />

            <ColorInput
              field={backgroundColor}
              visible={
                formFieldVisibility[backgroundColor.id] ||
                !backgroundColor.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

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
                formFieldVisibility[actionTextColor.id] ||
                !actionTextColor.hidden
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
                formFieldVisibility[cancelTextColor.id] ||
                !cancelTextColor.hidden
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

            <SelectMultipleInput
              field={displayConditions}
              position="default"
              visible={isFieldSet(layout.id)}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfter}
              visible={formFieldVisibility[hideAfter.id] || !hideAfter.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={pageVisits}
              visible={formFieldVisibility[pageVisits.id] || !pageVisits.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={scrollPercentageToDisplay}
              visible={
                formFieldVisibility[scrollPercentageToDisplay.id] ||
                !scrollPercentageToDisplay.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={showDelay}
              visible={formFieldVisibility[showDelay.id] || !showDelay.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <CheckboxInput
              field={showOnExitIntent}
              visible={
                formFieldVisibility[showOnExitIntent.id] ||
                !showOnExitIntent.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={impressionsGlobalDuration}
              visible={
                formFieldVisibility[impressionsGlobalDuration.id] ||
                !impressionsGlobalDuration.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={impressionsGlobalSession}
              visible={
                formFieldVisibility[impressionsGlobalSession.id] ||
                !impressionsGlobalSession.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={impressionsGlobalTotal}
              visible={
                formFieldVisibility[impressionsGlobalTotal.id] ||
                !impressionsGlobalTotal.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={impressionsWidgetDuration}
              visible={
                formFieldVisibility[impressionsWidgetDuration.id] ||
                !impressionsWidgetDuration.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={impressionsWidgetSession}
              visible={
                formFieldVisibility[impressionsWidgetSession.id] ||
                !impressionsWidgetSession.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={impressionsWidgetTotal}
              visible={
                formFieldVisibility[impressionsWidgetTotal.id] ||
                !impressionsWidgetTotal.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfterActionClosedHideCount}
              visible={
                formFieldVisibility[hideAfterActionClosedHideCount.id] ||
                !hideAfterActionClosedHideCount.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfterActionClosedHideDuration}
              visible={
                formFieldVisibility[hideAfterActionClosedHideDuration.id] ||
                !hideAfterActionClosedHideDuration.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfterActionConfirmHideCount}
              visible={
                formFieldVisibility[hideAfterActionConfirmHideCount.id] ||
                !hideAfterActionConfirmHideCount.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfterActionConfirmHideDuration}
              visible={
                formFieldVisibility[hideAfterActionConfirmHideDuration.id] ||
                !hideAfterActionConfirmHideDuration.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfterActionCancelHideCount}
              visible={
                formFieldVisibility[hideAfterActionCancelHideCount.id] ||
                !hideAfterActionCancelHideCount.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={hideAfterActionCancelHideDuration}
              visible={
                formFieldVisibility[hideAfterActionCancelHideDuration.id] ||
                !hideAfterActionCancelHideDuration.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />
          </Stack>
        )}

        {/* criteria */}
        {/* <Stack spacing={2}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            Configure Display Criteria
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae
            commodo lacus. Cras tempus lobortis commodo. Ut consectetur et nulla
            eget porta. Aliquam quis lectus vitae odio egestas varius.
          </Typography>
        </Stack> */}
      </Stack>
    </form>
  );
};

export default ExperienceWizard;
