import { Box } from "@mui/material";
import React from "react";
import { bannerImgUrl } from "../../utils/constant";

const LeftSectionPreview = () => {
  return (
    <Box position="relative" width="100%" height="100%">
      <img
        src={bannerImgUrl}
        className="banner-img"
        alt="Banner of share care"
      />
    </Box>
  );
};

export default LeftSectionPreview;
