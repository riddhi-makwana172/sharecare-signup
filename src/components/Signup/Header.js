import React, { useState } from "react";
import { Box, Button, Drawer, Grid, Link, Paper, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { logoImgUrl } from "../../utils/constant";
import {
  howItWorksLabel,
  joiningSimpleLabel,
  joiningSimpleSubText,
  step1Title,
  step1,
  step2Title,
  step3Title,
  step3,
  step2,
} from "../../utils/messages";
import StepStack from "./StepStack";
import CommonTextStack from "./CommonTextStack";

const Header = () => {
  const [open, setOpen] = useState(false);
  const helvFM = "Helvetica Neue",
    timeposFM = "Tiempos Headline Regular";
  const DrawerContent = (
    <Box
      sx={{ width: 403 }}
      padding="40px"
      boxSizing="border-box"
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <Stack spacing={2} justifyContent="flex-end" className="close-btn-stack">
        <Button className="close-btn">Close</Button>
      </Stack>
      <Stack marginTop="60px">
        <CommonTextStack
          color="#93999E"
          fontFamily={helvFM}
          fontSize="0.875rem"
          lineHeight={1.125}
          marginTop="16px"
          title={howItWorksLabel.toUpperCase()}
        />
        <CommonTextStack
          color="#006658"
          fontFamily={timeposFM}
          fontSize="2.25rem"
          lineHeight={1.19}
          marginTop="16px"
          title={joiningSimpleLabel}
        />
        <CommonTextStack
          color="#000"
          fontFamily={helvFM}
          fontSize="0.875rem"
          lineHeight={1.125}
          marginTop="16px"
          title={joiningSimpleSubText}
        />
        <StepStack
          icon={<FavoriteBorderIcon />}
          label={step1Title}
          stepLabel={step1}
        />
        <StepStack
          icon={<FavoriteIcon />}
          label={step2Title}
          stepLabel={step2}
        />
        <StepStack
          icon={<FavoriteIcon />}
          label={step3Title}
          stepLabel={step3}
        />
      </Stack>
    </Box>
  );
  return (
    <Paper component="header" className="signup-header">
      <Grid className="header-grid">
        <Link href="https://try.sharecare.com/">
          <img
            src={logoImgUrl}
            width="150"
            height="30"
            alt="logo of share care"
          />
        </Link>
        <Button className="how-it-work-btn" onClick={() => setOpen(true)}>
          {howItWorksLabel}
        </Button>
      </Grid>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        {DrawerContent}
      </Drawer>
    </Paper>
  );
};

export default Header;
