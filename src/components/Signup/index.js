import React from "react";
import { Grid } from "@mui/material";
import LeftSectionPreview from "./LeftSectionPreview";
import RightSectionPreview from "./RightSectionPreview";
import Header from "./Header";

const SignupWrapper = () => {
  return (
    <>
      <Header />
      <Grid container className="grid-wrapper">
        <Grid
          item
          xs={12}
          xl={6}
          sm={12}
          md={6}
          padding="20px"
          className="left-side-grid"
        >
          <LeftSectionPreview />
        </Grid>
        <Grid
          item
          xs={12}
          xl={6}
          sm={12}
          md={6}
          sx={{ overflowY: "auto", height: "100vh" }}
          className="right-side-grid"
        >
          <RightSectionPreview />
        </Grid>
      </Grid>
    </>
  );
};

export default SignupWrapper;
