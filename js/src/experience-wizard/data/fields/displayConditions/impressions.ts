import { Field } from "../../pfa-fields";

export const ImpressionsGlobalTotal: Field = {
  id: "impressionsGlobalTotal",
  label: "Hide after a number of total impressions?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.global.total",
};

export const ImpressionsGlobalSession: Field = {
  id: "impressionsGlobalSession",
  label: "Hide after a number of sessions impressions?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.global.session",
};

export const ImpressionsGlobalDuration: Field = {
  id: "impressionsGlobalDuration",
  label: "Reset after how many seconds?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.global.duration",
};

export const ImpressionsWidgetTotal: Field = {
  id: "impressionsWidgetTotal",
  label: "Hide after a number of total impressions?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.widget.total",
};

export const ImpressionsWidgetSession: Field = {
  id: "impressionsWidgetSession",
  label: "Hide after a number of sessions impressions?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.widget.session",
};

export const ImpressionsWidgetDuration: Field = {
  id: "impressionsWidgetDuration",
  label: "Reset after how many seconds?",
  description: "TBD",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.widget.duration",
};
