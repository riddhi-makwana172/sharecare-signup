import { Chip, Stack } from "@mui/material";
import React from "react";
import CommonTextStack from "./CommonTextStack";

const StepStack = ({ label, icon, stepLabel }) => {
  const textProps = {
    title: label,
    fontSize: "1.5rem",
    fontFamily: "Tiempos Headline Regular",
    color: "#006658",
    lineHeight: 1.125,
    marginTop: "24px",
  };

  return (
    <Stack marginTop="60px">
      <Chip icon={icon} label={stepLabel} className="step-label" />
      <CommonTextStack {...textProps} />
    </Stack>
  );
};

export default StepStack;
