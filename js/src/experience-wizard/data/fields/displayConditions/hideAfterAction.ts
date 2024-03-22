import { Field } from "../../pfa-fields";

// hideAfterAction.closed
export const HideAfterActionClosedHideCount: Field = {
  id: "hideAfterActionClosedHideCount",
  label: "Maximum number of closes before hiding?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.closed.hideCount",
};

export const HideAfterActionClosedHideDuration: Field = {
  id: "hideAfterActionClosedHideDuration",
  label: "How long to hide after closing?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.closed.duration",
};

// hideAfterAction.confirm
export const HideAfterActionConfirmHideCount: Field = {
  id: "hideAfterActionConfirmHideCount",
  label: "Maximum number of confirms before hiding?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.confirm.hideCount",
};

export const HideAfterActionConfirmHideDuration: Field = {
  id: "hideAfterActionConfirmHideDuration",
  label: "How long to hide after confirming?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.confirm.duration",
};

// hideAfterAction.cancel

export const HideAfterActionCancelHideCount: Field = {
  id: "hideAfterActionCancelHideCount",
  label: "Maximum number of cancels before hiding?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.cancel.hideCount",
};

export const HideAfterActionCancelHideDuration: Field = {
  id: "hideAfterActionCancelHideDuration",
  label: "How long to hide after cancelling?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.cancel.duration",
};
