// main.ts

// import "./src/experience-wizard/experience-wizard";

// // Shared setup that should run before any specific behavior.
// console.log("Lytics experience wizard initialized.");

// // lytics-experience-wizard.js (ES module format)
// export function initializeWizard() {
//   console.log("Winning");
// }

// initializeWizard();

// lytics-experience-wizard.js (ES module format)

// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import ExperienceWizard from "./src/experience-wizard/mainForm";

// Define a simple React component
const HelloWorld = () => {
  return (
    <Box p={2} bgcolor="#F7F7F7">
      <ExperienceWizard />
    </Box>
  );
};

// Render the component to the DOM
ReactDOM.render(
  <HelloWorld />,
  document.getElementById("experience-wizard-wrapper")
);
