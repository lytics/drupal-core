import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";

export interface NumberedSectionProps {
  number: number;
  inputSpaceVertical?: number;
  headline: string;
  description?: string;
  children: React.ReactNode;
}

export const StepHeader = ({ number, label }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" pb={2}>
      <Avatar
        sx={{
          background:
            "linear-gradient(114.71deg, #8610D3 35.06%, #BE32D5 88.83%)",
          color: "#FFF",
        }}
      >
        {number}
      </Avatar>
      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
        {label}
      </Typography>
    </Stack>
  );
};

export const NumberedSection: React.FC<NumberedSectionProps> = ({
  children,
  description,
  inputSpaceVertical,
  headline,
  number,
}) => {
  return (
    <Stack
      direction="column"
      spacing={inputSpaceVertical || 2}
      flex={1}
      borderRadius={2}
      bgcolor={"#F7F7F7"}
      p={5}
    >
      <StepHeader number={number} label={headline} />
      {children}
    </Stack>
  );
};
