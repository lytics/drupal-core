import React, { useEffect, useState, useRef } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";

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
import { ConditionGroup } from "./components/form/conditionGroup";
import { SectionHeader } from "./components/form/sectionHeader";
import { ColorPicker } from "./components/form/colorPicker";
import { JSONInputWithHighlighting } from "./components/form/syntaxHighlighedTextArea";

interface ExperienceWizardProps {
  accountId: string;
  accessToken: string;
  pathforaConfig: string;
}

const inputSpaceVert = 4;
const headerSpacevert = 3;

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
  const [tabValue, setTabValue] = useState(0);
  const [renderedConfig, setRenderedConfig] = useState("");

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
    const inboundPathforaConfig = JSON.parse(pathforaConfig);
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

    const output = JSON.stringify(config, null, 2);
    setRenderedConfig(output);

    return output;
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

  const fieldValueContains = (
    field: string,
    value: string | string[]
  ): boolean => {
    const values = Array.isArray(value) ? value : [value];
    return values.some((v) => {
      const fieldValue = formValues[field];
      const fieldValueArray = fieldValue.split(",");

      // iterate through fieldValueArray and look for exact match
      return fieldValueArray.some((fv) => fv === v);

      // return typeof fieldValue === "string" && fieldValue.includes(v);
    });
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
      <Stack spacing={3}>
        {/* top level experience details */}
        <Stack spacing={2}>
          <SectionHeader
            headline={"Details"}
            description={
              "Manage the top level details for your experience is displayed and accessed by site admins."
            }
          />
          <Stack direction={"row"} spacing={10}>
            <Stack direction="column" spacing={inputSpaceVert} flex={1}>
              <Stack direction="row" spacing={inputSpaceVert} flex={1}>
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
        <Stack pt={3} spacing={inputSpaceVert}>
          <SectionHeader
            headline={"Configuration"}
            description={
              "Manage the details of your campaign such as top-level type, design and display conditions."
            }
          />
          <SelectInput
            field={type}
            position={"default"}
            visible={formFieldVisibility[type.id] || !type.hidden}
            formValues={formValues}
            handleChange={handleChange}
          />

          {isFieldSet(type.id) && (
            // tabs here

            <Stack flex={1} spacing={1}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                style={{ marginLeft: "auto" }}
                sx={{
                  "& .MuiButtonBase-root": {
                    "&:focus": {
                      boxShadow: "none",
                      borderColor: "none",
                    },
                  },
                }}
              >
                <Tab label="Basic Editor" />
                <Tab label="Advanced Editor" />
              </Tabs>
              {tabValue === 1 && (
                <Box>
                  <JSONInputWithHighlighting
                    value={renderedConfig}
                    // onChange={(value) => setRenderedConfig(value)}
                  />
                </Box>
              )}
              {tabValue === 0 && (
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
                        visible={
                          formFieldVisibility[message.id] || !message.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                      <Stack direction="row" spacing={inputSpaceVert}>
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
                      inputSpaceVertical={inputSpaceVert}
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

                      <Stack spacing={inputSpaceVert} direction={"row"}>
                        <ConditionGroup
                          spacing={inputSpaceVert}
                          label={"Design Options"}
                        >
                          <SelectInput
                            field={variantWithOptions(formValues[layout.id])}
                            position={"default"}
                            visible={isFieldSet(layout.id)}
                            formValues={formValues}
                            handleChange={handleChange}
                          />

                          <TextInput
                            field={image}
                            visible={
                              formFieldVisibility[image.id] || !image.hidden
                            }
                            formValues={formValues}
                            handleChange={handleChange}
                          />
                        </ConditionGroup>
                        <ConditionGroup
                          spacing={inputSpaceVert}
                          label={"Positioning"}
                        >
                          <SelectInput
                            field={positionWithOptions(formValues[layout.id])}
                            visible={
                              formFieldVisibility[position.id] ||
                              !position.hidden
                            }
                            position={"default"}
                            formValues={formValues}
                            handleChange={handleChange}
                          />

                          <SelectInput
                            field={originWithOptions(formValues[layout.id])}
                            visible={
                              formFieldVisibility[origin.id] || !origin.hidden
                            }
                            position={"default"}
                            formValues={formValues}
                            handleChange={handleChange}
                          />

                          <TextInput
                            field={pushDown}
                            visible={
                              formFieldVisibility[pushDown.id] ||
                              !pushDown.hidden
                            }
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
                        </ConditionGroup>
                      </Stack>
                    </NumberedSection>
                  </Stack>
                  <Stack direction="row" spacing={inputSpaceVert}>
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
                          visible={
                            formFieldVisibility[textColor.id] ||
                            !textColor.hidden
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
                            formFieldVisibility[closeColor.id] ||
                            !closeColor.hidden
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
                      </ColorPicker>
                    </NumberedSection>
                  </Stack>

                  {/* display conditions */}
                  <Stack direction="row" spacing={4}>
                    <NumberedSection
                      number={5}
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

                      {isFieldSet(displayConditions.id) && (
                        <Stack
                          mt={3}
                          p={3}
                          spacing={5}
                          sx={{
                            flex: 1,
                            borderLeft: "5px solid #E0E0E0",
                            borderRight: "5px solid #E0E0E0",
                            backgroundColor: "#FFF",
                          }}
                        >
                          {fieldValueContains(displayConditions.id, [
                            hideAfter.id,
                            pageVisits.id,
                            scrollPercentageToDisplay.id,
                            showDelay.id,
                            showOnExitIntent.id,
                          ]) && (
                            <Stack spacing={headerSpacevert}>
                              <SectionHeader
                                variation="secondary"
                                headline={
                                  "General engagement and delay based conditions."
                                }
                                description={
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar sed enim ac maximus. Vivamus dui ligula, blandit vel est id, pellentesque dapibus tortor. Proin quis ullamcorper ex, tincidunt egestas orci."
                                }
                              />

                              <Stack
                                spacing={inputSpaceVert}
                                direction={"column"}
                              >
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

                          {fieldValueContains(
                            displayConditions.id,
                            "impressions"
                          ) && (
                            <Stack spacing={3}>
                              <SectionHeader
                                variation="secondary"
                                headline={"Hide after receiving impressions?"}
                                description={
                                  "Impression settings applied globally will result in all experience interactions contributing to the logic. For instance, if you have three experiences running and a visitors sees each of them once, that will result in 3 total global impressions."
                                }
                              />
                              <Stack spacing={inputSpaceVert} direction={"row"}>
                                <ConditionGroup
                                  spacing={inputSpaceVert}
                                  label={"Widget"}
                                >
                                  <TextInput
                                    field={impressionsWidgetSession}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        impressionsWidgetSession.id
                                      ] || !impressionsWidgetSession.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                    size="small"
                                  />

                                  <TextInput
                                    field={impressionsWidgetTotal}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        impressionsWidgetTotal.id
                                      ] || !impressionsWidgetTotal.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                    size="small"
                                  />

                                  <TextInput
                                    field={impressionsWidgetDuration}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        impressionsWidgetDuration.id
                                      ] || !impressionsWidgetDuration.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                    size="small"
                                  />
                                </ConditionGroup>

                                <ConditionGroup
                                  spacing={inputSpaceVert}
                                  label={"Global"}
                                >
                                  <TextInput
                                    field={impressionsGlobalSession}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        impressionsGlobalSession.id
                                      ] || !impressionsGlobalSession.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                    size="small"
                                  />
                                  <TextInput
                                    field={impressionsGlobalTotal}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        impressionsGlobalTotal.id
                                      ] || !impressionsGlobalTotal.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                    size="small"
                                  />
                                  <TextInput
                                    field={impressionsGlobalDuration}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        impressionsGlobalDuration.id
                                      ] || !impressionsGlobalDuration.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                    size="small"
                                  />
                                </ConditionGroup>
                              </Stack>
                            </Stack>
                          )}

                          {fieldValueContains(
                            displayConditions.id,
                            "hideAfterAction"
                          ) && (
                            <Stack spacing={3}>
                              <SectionHeader
                                variation="secondary"
                                headline={"Hide after specific actions?"}
                                description={
                                  "Impression settings applied globally will result in all experience interactions contributing to the logic. For instance, if you have three experiences running and a visitors sees each of them once, that will result in 3 total global impressions."
                                }
                              />
                              <Stack spacing={inputSpaceVert} direction={"row"}>
                                <ConditionGroup
                                  spacing={inputSpaceVert}
                                  label={"After Closing Experience"}
                                >
                                  <TextInput
                                    field={hideAfterActionClosedHideCount}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        hideAfterActionClosedHideCount.id
                                      ] ||
                                      !hideAfterActionClosedHideCount.hidden
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
                                      ] ||
                                      !hideAfterActionClosedHideDuration.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                  />
                                </ConditionGroup>
                                <ConditionGroup
                                  spacing={inputSpaceVert}
                                  label={"After Pressing Confirm"}
                                >
                                  <TextInput
                                    field={hideAfterActionConfirmHideCount}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        hideAfterActionConfirmHideCount.id
                                      ] ||
                                      !hideAfterActionConfirmHideCount.hidden
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
                                      ] ||
                                      !hideAfterActionConfirmHideDuration.hidden
                                    }
                                    formValues={formValues}
                                    handleChange={handleChange}
                                  />
                                </ConditionGroup>
                                <ConditionGroup
                                  spacing={inputSpaceVert}
                                  label={"After Pressing Cancel"}
                                >
                                  <TextInput
                                    field={hideAfterActionCancelHideCount}
                                    type="number"
                                    visible={
                                      formFieldVisibility[
                                        hideAfterActionCancelHideCount.id
                                      ] ||
                                      !hideAfterActionCancelHideCount.hidden
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
                                      ] ||
                                      !hideAfterActionCancelHideDuration.hidden
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
                    </NumberedSection>
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default ExperienceWizard;
