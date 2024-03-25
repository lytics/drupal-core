// // main.ts

// import React from "react";
// import ReactDOM from "react-dom";
// import { Box } from "@mui/material";
// import ExperienceWizard from "./src/experience-wizard/mainForm";
// import { DrupalSettings } from "./types/drupalTypes";

// // Ensure Drupal and drupalSettings are recognized
// declare const Drupal: any;
// declare const drupalSettings: any;

// const accountId = settings?.lytics?.account_id;

// const HelloWorld = () => {

//   return (
//     <Box p={2} bgcolor="#F7F7F7">
//       <ExperienceWizard />
//     </Box>
//   );
// };

// ReactDOM.render(
//   <HelloWorld />,
//   document.getElementById("experience-wizard-wrapper")
// );

import React from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import ExperienceWizard from "./src/experience-wizard/mainForm";
import { DrupalSettings } from "./types/drupalTypes";

// Declare Drupal and drupalSettings
declare const Drupal: any;
declare const drupalSettings: DrupalSettings;

const HelloWorld = () => {
  const accountId = drupalSettings?.lytics?.account_id;
  const accessToken = drupalSettings?.lytics?.access_token;
  const pathforaConfig = drupalSettings?.lytics?.pathfora_config;

  console.log("settings", accessToken, accountId);
  return (
    <Box p={0} bgcolor="#FFF">
      <ExperienceWizard
        accountId={accountId || ""}
        accessToken={accessToken || ""}
        pathforaConfig={pathforaConfig || ""}
      />
    </Box>
  );
};

ReactDOM.render(
  <HelloWorld />,
  document.getElementById("experience-wizard-wrapper")
);
