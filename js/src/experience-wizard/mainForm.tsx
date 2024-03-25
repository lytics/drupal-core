import React, { useEffect, useState, useRef } from "react";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";

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
  experienceStatus,
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
  urlContains,
} from "./data/pfa-fields";

import { TextAreaInput } from "./components/form/textarea";
import { TextInput } from "./components/form/input";
import { CheckboxInput } from "./components/form/checkbox";
import { SelectInput } from "./components/form/select";
import { ColorInput } from "./components/form/color";
import { SelectMultipleInput } from "./components/form/selectMultiple";
import {
  URLContainsBuilder,
  URLContainsItem,
} from "./components/form/urlContains";
import { NumberedSection } from "./components/form/numberedSection";

interface ExperienceWizardProps {
  accountId: string;
  accessToken: string;
  pathforaConfig: string;
}

const ExperienceWizard: React.FC<ExperienceWizardProps> = ({
  accountId,
  accessToken,
  pathforaConfig,
}) => {
  const [formValues, setFormValues] = useState<{
    [key: string]: any;
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
    experienceStatus,
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
    urlContains,
  ];

  useEffect(() => {
    console.log("accountId", accountId);
    console.log("accessToken", accessToken);
    console.log("pathforaConfig", pathforaConfig);
  }, []);

  useEffect(() => {
    // example of inbound data
    // {
    //   "details": {
    //     "type": "message",
    //     "label": "Experience Name",
    //     "description": "Experience description."
    //   },
    //   "config": {
    //     "headline": "my headline",
    //     "msg": "my message",
    //     "id": "sample_experience"
    //   }
    // }
    const inboundPathforaConfig = JSON.parse(pathforaConfig);

    // take the inbound config and set the form values
    // the easiest way will be to iterate through each of the fields in the fields array
    // each of those objects will have a schema that looks like this:
    // import { Field } from "../pfa-fields";

    // export const Message: Field = {
    //   id: "msg",
    //   label: "Message",
    //   description: "The body of the message to display",
    //   order: 5,
    //   type: "string",
    //   method: "textarea",
    //   required: false,
    //   hidden: false,
    //   render: "config.msg",
    // };

    // the render key contains dot notation that will map to the inbound config so we'll need to access the value using that
    // then we can set the form value:
    // const [formValues, setFormValues] = useState<{
    //   [key: string]: any;
    // }>({});
    // using the id as the key and the value from the inbound config as the value

    fields.forEach((field) => {
      const { id, render } = field;
      const value = getValueByDotNotation(inboundPathforaConfig, render);
      setFormValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      checkDependency(field.id, value);
    });

    // Function to get value from dot notation
    function getValueByDotNotation(obj, path) {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    }
  }, []);

  const handleChange = (fieldId: string, value: any) => {
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
      // check if we have a valid value set
      const hasValue = formValues[field.id] !== undefined;

      // if we have a value render its position in the config object
      const pathArray = field.render.split(".");
      const pathsToVerify = pathArray.slice(0, pathArray.length - 1);

      // loop each of the paths to verify and ensure there is a value set, we can assume these will all be objects
      let currentObject = config;
      pathsToVerify.forEach((path) => {
        if (!currentObject[path]) {
          currentObject[path] = {};
        }
        currentObject = currentObject[path];
      });

      // if we have a value set, add it to the config object
      if (hasValue) {
        currentObject[pathArray[pathArray.length - 1]] = formValues[field.id];
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

    let valuesToCheck: string[] = [];
    if (field.type === "array") {
      console.log("checking", field.id, value);
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
        {/* top level experience details */}
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              Details
            </Typography>
            <Typography variant="body2">
              Manage the top level details for your experience is displayed and
              accessed by site admins.
            </Typography>
          </Box>

          <Stack direction={"row"} spacing={6}>
            <Stack direction="column" spacing={2} flex={1}>
              <Stack direction="row" spacing={2} flex={1}>
                <Box flex={1}>
                  <TextInput
                    field={experienceTitle}
                    visible={
                      formFieldVisibility[experienceTitle.id] ||
                      !experienceTitle.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                </Box>
                <Box maxWidth={450}>
                  <TextInput
                    field={experienceSlug}
                    visible={
                      formFieldVisibility[experienceSlug.id] ||
                      !experienceSlug.hidden
                    }
                    formValues={formValues}
                    inputProps={{
                      pattern: "[a-z0-9_\\-]*",
                      title:
                        "Please enter a valid slug (letters, numbers, underscore, and hyphen)",
                    }}
                    handleChange={handleChange}
                  />
                </Box>
              </Stack>
              <TextAreaInput
                field={experienceDescription}
                visible={
                  formFieldVisibility[experienceDescription.id] ||
                  !experienceDescription.hidden
                }
                rows={2}
                formValues={formValues}
                handleChange={handleChange}
              />
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box
                p={5}
                sx={{
                  minWidth: "200px",
                  background:
                    "linear-gradient(87.28deg, rgba(209, 199, 245, 0.4) -4.23%, rgba(185, 237, 252, 0.4) 127.49%)",
                  borderRadius: "5px",
                }}
              >
                <SelectInput
                  field={experienceStatus}
                  position={"default"}
                  visible={
                    formFieldVisibility[experienceStatus.id] ||
                    !experienceStatus.hidden
                  }
                  formValues={formValues}
                  handleChange={handleChange}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>

        {/* configure experience details */}
        <Stack pt={3} spacing={2}>
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              Configuration
            </Typography>
            <Typography variant="body2">
              Manage the details of your campaign such as top-level type, design
              and display conditions.
            </Typography>
          </Box>
          <SelectInput
            field={type}
            position={"default"}
            visible={formFieldVisibility[type.id] || !type.hidden}
            formValues={formValues}
            handleChange={handleChange}
          />

          {isFieldSet(type.id) && (
            <Stack direction="column" spacing={4}>
              {/* messaging and url rules */}
              <Stack direction="row" spacing={4}>
                <NumberedSection
                  number={1}
                  headline={"What would you like your experience to say?"}
                >
                  <TextInput
                    field={headline}
                    visible={
                      formFieldVisibility[headline.id] || !headline.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                  <TextAreaInput
                    field={message}
                    visible={formFieldVisibility[message.id] || !message.hidden}
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                  <Stack direction="row" spacing={3}>
                    <Stack direction={"column"} spacing={0} minWidth={325}>
                      <CheckboxInput
                        field={okShow}
                        visible={
                          formFieldVisibility[okShow.id] || !okShow.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                      <Box pl={4} pr={5}>
                        <TextInput
                          field={okMessage}
                          visible={isFieldSet(okShow.id)}
                          size="small"
                          formValues={formValues}
                          handleChange={handleChange}
                        />
                      </Box>
                    </Stack>
                    <Stack direction={"column"} spacing={0} minWidth={325}>
                      <CheckboxInput
                        field={cancelShow}
                        visible={
                          formFieldVisibility[cancelShow.id] ||
                          !cancelShow.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                      <Box pl={4} pr={5}>
                        <TextInput
                          field={cancelMessage}
                          visible={isFieldSet(cancelShow.id)}
                          size="small"
                          formValues={formValues}
                          handleChange={handleChange}
                        />
                      </Box>
                    </Stack>
                  </Stack>
                </NumberedSection>

                <NumberedSection
                  number={2}
                  headline={
                    "Where would you like your experience to be displayed?"
                  }
                >
                  <URLContainsBuilder
                    field={urlContains}
                    visible={isFieldSet(type.id)}
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                </NumberedSection>
              </Stack>

              {/* layout */}
              <Stack direction="row" spacing={4}>
                <NumberedSection
                  number={3}
                  headline={
                    "Where and how would you like your experience to appear?"
                  }
                >
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
                    visible={
                      formFieldVisibility[position.id] || !position.hidden
                    }
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
                    visible={
                      formFieldVisibility[pushDown.id] || !pushDown.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                </NumberedSection>
              </Stack>
              <Stack direction="row" spacing={4}>
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
                    visible={
                      formFieldVisibility[textColor.id] || !textColor.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />

                  <ColorInput
                    field={headlineColor}
                    visible={
                      formFieldVisibility[headlineColor.id] ||
                      !headlineColor.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />

                  <ColorInput
                    field={closeColor}
                    visible={
                      formFieldVisibility[closeColor.id] || !closeColor.hidden
                    }
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
                </NumberedSection>
              </Stack>

              {/* display conditions */}
              <Stack direction="row" spacing={4}>
                <NumberedSection
                  number={4}
                  headline={
                    "Are there any other special conditions you'd like your experience to display under?"
                  }
                >
                  <SelectMultipleInput
                    field={displayConditions}
                    position="default"
                    visible={isFieldSet(layout.id)}
                    formValues={formValues}
                    handleChange={handleChange}
                  />

                  <TextInput
                    field={hideAfter}
                    visible={
                      formFieldVisibility[hideAfter.id] || !hideAfter.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />

                  <TextInput
                    field={pageVisits}
                    visible={
                      formFieldVisibility[pageVisits.id] || !pageVisits.hidden
                    }
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
                    visible={
                      formFieldVisibility[showDelay.id] || !showDelay.hidden
                    }
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
                      formFieldVisibility[
                        hideAfterActionClosedHideDuration.id
                      ] || !hideAfterActionClosedHideDuration.hidden
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
                      formFieldVisibility[
                        hideAfterActionConfirmHideDuration.id
                      ] || !hideAfterActionConfirmHideDuration.hidden
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
                      formFieldVisibility[
                        hideAfterActionCancelHideDuration.id
                      ] || !hideAfterActionCancelHideDuration.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                </NumberedSection>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default ExperienceWizard;
