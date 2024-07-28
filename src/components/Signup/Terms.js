import React, { useState } from "react";
import { Link, Typography } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Terms = () => {
  const [show, setShow] = useState(false);
  const {
    REACT_APP_OFFER_TERMS,
    REACT_APP_PRIVACY_POLICY,
    REACT_APP_PRIVACY_POLICY_CA,
    REACT_APP_TERMS_OF_USE,
  } = process.env;
  const offerTerms = REACT_APP_OFFER_TERMS,
    privacypolicy = REACT_APP_PRIVACY_POLICY,
    privacypolicyCa = REACT_APP_PRIVACY_POLICY_CA,
    terms = REACT_APP_TERMS_OF_USE;

  return (
    <>
      <Typography className="terms" align="center">
        By signing up, I agree to the{" "}
        <Link href={offerTerms} sx={{ ml: "2px", mr: "1px" }}>
          Offer Terms
        </Link>{" "}
        <KeyboardArrowDownOutlinedIcon
          className={`icon ${show ? "rotated" : ""}`}
          sx={{ cursor: "pointer" }}
          onClick={() => setShow((prev) => !prev)}
        />
      </Typography>
      {show && (
        <Typography align="center" className="privacy-policy">
          I agree to the <Link href={offerTerms}>Offer Terms</Link> and
          understand I am creating a Sharecare account. I agree to the Sharecare{" "}
          <Link href={privacypolicy}>Privacy Policy</Link>,{" "}
          <Link href={terms}>Terms</Link>, and, if applicable to me, the{" "}
          <Link href={privacypolicyCa}>
            Privacy Notice for California Residents
          </Link>
          . I consent to Sharecare’s processing of any health information I may
          provide, for the purposes listed in the{" "}
          <Link href={privacypolicy}>Privacy Policy</Link>. I agree to receive
          emails, offers, alerts, and other notices. I understand that I can
          opt-out of marketing communications at any time.
        </Typography>
      )}
    </>
  );
};

export default Terms;
