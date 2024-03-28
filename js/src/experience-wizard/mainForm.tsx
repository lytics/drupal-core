import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";

import {
  Field,
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
import { SelectInput } from "./components/form/select";
import { SectionHeader } from "./components/form/sectionHeader";
import { JSONInputWithHighlighting } from "./components/form/syntaxHighlighedTextArea";
import { MessagingSection } from "./components/messaging";
import { TargetingSection } from "./components/targeting";
import { PositionSection } from "./components/position";
import { BrandingSection } from "./components/branding";
import { DisplayRulesSection } from "./components/displayRules";
import { PathforaHandler } from "./utility/pathforaInterface";

interface ExperienceWizardProps {
  accountId: string;
  accessToken: string;
  pathforaConfig: string;
}

const inputSpaceVert = 4;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      flex={1}
      id={`configuration-panel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

const ExperienceWizard: React.FC<ExperienceWizardProps> = ({
  accountId,
  accessToken,
  pathforaConfig,
}) => {
  // test

  // const obj = {
  //   id: "confirm-callback",
  //   layout: "modal",
  //   msg: 'Click the "confirm" button to see the callback',
  //   confirmAction: {
  //     name: "custom confirm",
  //     callback: function (event, payload) {
  //       alert("confirm callback");
  //       console.log(payload);
  //     },
  //   },
  // };

  // const testSerialize = serialize(obj);

  // function deserialize(serializedJavascript) {
  //   return eval("(" + serializedJavascript + ")");
  // }

  // const deserialized = deserialize(testSerialize);
  // deserialized.confirmAction.callback();

  // test

  const [formValues, setFormValues] = useState<{
    [key: string]: any;
  }>({});
  const [formFieldVisibility, setFormFieldVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [editorTypeTabValue, setEditorTypeTabValue] = useState(0);
  const [basicEditorTabValue, setBasicEditorTabValue] = useState(0);
  const [advancedEditorTabValue, setAdvancedEditorTabValue] = useState(0);
  const [renderedConfig, setRenderedConfig] = useState(pathforaConfig);
  const [pathfora, setPathfora] = useState<any>();

  const [cbConfirmAction, setCbConfirmAction] = useState("");
  const [cbCancelAction, setCbCancelAction] = useState("");
  const [cbCloseAction, setCbCloseAction] = useState("");
  const [cbOnInit, setCbOnInit] = useState("");
  const [cbOnLoad, setCbOnLoad] = useState("");
  const [cbOnClick, setCbOnClick] = useState("");
  const [cbOnModalClose, setCbOnModalClose] = useState("");

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
    // console.log("accountId", accountId);
    // console.log("accessToken", accessToken);
    // console.log("pathforaConfig", pathforaConfig);
  }, []);

  useEffect(() => {
    const pathforaHandler = async () => {
      try {
        const handler = new PathforaHandler();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
        setPathfora(handler);
      } catch (error) {
        console.error("Error creating PathforaHandler:", error);
      }
    };

    pathforaHandler();
  }, []);

  const testpathfora = () => {
    const config = JSON.parse(renderedConfig);
    // const config = {
    //   id: "confirm-callback",
    //   layout: "modal",
    //   msg: 'Click the "confirm" button to see the callback',
    //   confirmAction: {
    //     name: "custom confirm",
    //     callback: function (event, payload) {
    //       alert("confirm callback");
    //       console.log(payload);
    //     },
    //   },
    // };

    const friendlyExperience = pathfora?.serializeExperience(config);
    console.log(friendlyExperience);

    const experience = pathfora?.deserializeExperience(friendlyExperience);
    pathfora?.testExperience(experience);
  };

  const getValueByDotNotation = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const updateValuesFromConfig = (config: string) => {
    if (!config) {
      return;
    }
    const inboundPathforaConfig = JSON.parse(config);

    fields.forEach((field) => {
      const { id, render } = field;
      const value = getValueByDotNotation(inboundPathforaConfig, render);
      setFormValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      checkDependency(field.id, value);
    });
  };

  const handleEditorTypeTabChange = (event, newValue) => {
    setEditorTypeTabValue(newValue);
  };

  const handleBasicEditorTabChange = (event, newValue) => {
    setBasicEditorTabValue(newValue);
  };

  const handleAdvancedEditorTabChange = (event, newValue) => {
    setAdvancedEditorTabValue(newValue);
  };

  // const handleBasicTabChange = (event, newValue) => {
  //   setBasicEditorTabValue(newValue);
  // };

  // const handleAdvancedTabChange = (event, newValue) => {
  //   setAdvancedEditorTabValue(newValue);
  // };

  useEffect(() => {
    updateValuesFromConfig(pathforaConfig);
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
    if (field.type === "array" && value) {
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

  const handleConfigChange = (value: string) => {
    console.log("here");
    updateValuesFromConfig(value);
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
      <Button
        variant="contained"
        color="primary"
        onClick={testpathfora}
        style={{
          position: "fixed",
          // top: "50%",
          right: 20,
          bottom: 5,
          transform: "translateY(-50%)",
          zIndex: 1200,
        }}
      >
        Preview Experience
      </Button>

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
            <Stack flex={1} spacing={0}>
              <Tabs
                value={editorTypeTabValue}
                onChange={handleEditorTypeTabChange}
                style={{ marginLeft: "auto" }}
                sx={{
                  "& .MuiButtonBase-root": {
                    "&:focus": {
                      boxShadow: "none",
                      borderColor: "none",
                    },
                  },
                  background: "#ECECEC",
                }}
              >
                <Tab label="Basic Editor" />
                <Tab label="Advanced Editor" />
              </Tabs>

              {editorTypeTabValue === 1 && (
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={advancedEditorTabValue}
                    onChange={handleAdvancedEditorTabChange}
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      "& .MuiButtonBase-root": {
                        "&:focus": {
                          boxShadow: "none",
                          borderColor: "none",
                        },
                      },
                    }}
                  >
                    <Tab label="Pathfora" id={"advanced-tab-0"} />
                    <Tab label="Callbacks" id={"advanced-tab-2"} />
                    <Tab label="CSS" id={"advanced-tab-1"} />
                  </Tabs>

                  {/* Pathfora Editor Tab */}
                  <TabPanel value={advancedEditorTabValue} index={0}>
                    <Box>
                      <JSONInputWithHighlighting
                        value={renderedConfig}
                        onChange={handleConfigChange}
                      />
                    </Box>
                  </TabPanel>

                  {/* const [cbConfirmAction, setCbConfirmAction] = useState("");
                  const [cbCancelAction, setCbCancelAction] = useState("");
                  const [cbCloseAction, setCbCloseAction] = useState("");
                  const [cbOnInit, setCbOnInit] = useState("");
                  const [cbOnLoad, setCbOnLoad] = useState("");
                  const [cbOnClick, setCbOnClick] = useState("");
                  const [cbOnModalClose, setCbOnModalClose] = useState(""); */}

                  {/* Callback Function Editor Tab */}
                  <TabPanel value={advancedEditorTabValue} index={2}>
                    <Box>
                      <JSONInputWithHighlighting
                        value={""}
                        onChange={handleConfigChange}
                      />
                    </Box>
                  </TabPanel>

                  {/* CSS Editor Tab */}
                  <TabPanel value={advancedEditorTabValue} index={1}>
                    <Box>
                      <JSONInputWithHighlighting
                        value={""}
                        onChange={handleConfigChange}
                      />
                    </Box>
                  </TabPanel>
                </Box>
              )}
              {editorTypeTabValue === 0 && (
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={basicEditorTabValue}
                    onChange={handleBasicEditorTabChange}
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      "& .MuiButtonBase-root": {
                        "&:focus": {
                          boxShadow: "none",
                          borderColor: "none",
                        },
                      },
                    }}
                  >
                    <Tab label="Messaging" id={"basic-tab-0"} />
                    <Tab label="Targeting" id={"basic-tab-1"} />
                    <Tab label="Layout" id={"basic-tab-2"} />
                    <Tab label="Branding" id={"basic-tab-3"} />
                    <Tab label="Display Rules" id={"basic-tab-4"} />
                  </Tabs>

                  {/* Messaging Tab */}
                  <TabPanel value={basicEditorTabValue} index={0}>
                    <MessagingSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                      spacing={inputSpaceVert}
                    />
                  </TabPanel>

                  {/* Taregeting Tab */}
                  <TabPanel value={basicEditorTabValue} index={1}>
                    <TargetingSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                    />
                  </TabPanel>

                  {/* Position Tab */}
                  <TabPanel value={basicEditorTabValue} index={2}>
                    <PositionSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                      spacing={inputSpaceVert}
                    />
                  </TabPanel>

                  {/* Branding Tab */}
                  <TabPanel value={basicEditorTabValue} index={3}>
                    <BrandingSection
                      formValues={formValues}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                    />
                  </TabPanel>

                  {/* Display Rules Tab */}
                  <TabPanel value={basicEditorTabValue} index={4}>
                    <DisplayRulesSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                      spacing={inputSpaceVert}
                    />
                  </TabPanel>
                </Box>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default ExperienceWizard;
