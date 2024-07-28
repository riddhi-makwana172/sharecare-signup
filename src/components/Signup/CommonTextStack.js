import { Typography } from "@mui/material";
import React from "react";

const CommonTextStack = ({
  title,
  fontSize,
  fontFamily,
  color,
  lineHeight,
  marginTop,
}) => {
  return (
    <Typography sx={{ fontSize, fontFamily, color, lineHeight, marginTop }}>
      {title}
    </Typography>
  );
};

export default CommonTextStack;
