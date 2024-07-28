import React, { useState } from "react";
import {
  Autocomplete,
  autocompleteClasses,
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import { LoadingButton } from "@mui/lab";
import {
  addressLabel,
  bornValidateMsg,
  cityLabel,
  continueEmail,
  dobLabel,
  emailLabel,
  fnameLabel,
  fnameValidateMsg,
  genderLabel,
  invalidAddressMsg,
  invalidDateFormatMsg,
  invalidDOBMsg,
  invalidEmailMsg,
  mobileLabel,
  phoneDigitInvalidMsg,
  requiredFieldMsg,
  singupLabel,
  stateLabel,
  yourInfoLabel,
} from "../../utils/messages";
import {
  editSvg,
  emailRegex,
  fieldArr,
  fullnameRegex,
  genderValue,
  mobileRegex,
} from "../../utils/constant";
import Input from "../Common/Input";
import locationData from "../../utils/locationData.json";
import Terms from "./Terms";

const focusInitialValue = {
  fullname: false,
  mobile: false,
  date: false,
  address: false,
  dob: false,
};
const RightSectionPreview = () => {
  const [mobileValue, setMobileValue] = useState("");
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState({});
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState({});
  const [gender, setGender] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(focusInitialValue);

  const defaultProps = {
    options: locationData,
    getOptionLabel: (option) => option.address,
  };

  const handleMobileChange = (value) => {
    if (value.length <= 10) {
      const inputValue = value.replace(/\D/g, ""); // Remove non-digits
      const formattedValue = inputValue.replace(mobileRegex, "($1) $2-$3");
      setMobileValue(formattedValue);
    }
  };

  const handleDOBChange = (value) => {
    // Remove all non-digit characters
    let inputValue = value.replace(/\D/g, "");

    // Format the input value as MM/DD/YYYY
    if (inputValue.length > 2 && inputValue.length <= 4) {
      inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
    } else if (inputValue.length > 4) {
      inputValue =
        inputValue.slice(0, 2) +
        "/" +
        inputValue.slice(2, 4) +
        "/" +
        inputValue.slice(4, 8);
    }
    setDOB(inputValue);
  };

  const handleInputChange = (name, value) => {
    setFocused({ ...focused, [name]: true });
    if (name === "mobile") handleMobileChange(value);
    else if (name === "address") setAddress(value);
    else if (name === "dob") handleDOBChange(value);
    else if (name === "fullname") setFullName(value);
    else if (name === "email") setEmail(value);
    else if (name === "gender") setGender(value);
  };

  const dateValidation = (name, value, errObj) => {
    if (value.length !== 10) {
      return invalidDateFormatMsg;
    } else {
      const [month, day, year] = value
        .split("/")
        .map((num) => parseInt(num, 10));

      // Validate date components
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        return invalidDOBMsg;
      } else if (year < 1900) return bornValidateMsg;
      else {
        const inputDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        if (inputDate > currentDate) {
          return invalidDOBMsg;
        }
      }
    }
  };

  const addressValidation = (name, value) => {
    const result = locationData.some((item) => item.address === value);
    if (!result) {
      setAddress({});
      return invalidAddressMsg;
    } else setValid({ ...valid, [name]: true, city: true, state: true });
  };

  const validationFormCheck = (name, value) => {
    if (!(name && value)) {
      let err = {};
      fieldArr.forEach((item) => {
        if (!valid[item]) {
          err = { ...err, [item]: requiredFieldMsg };
        }
      });
      setErrors(err);
      return err;
    } else {
      let errObj = { ...errors };
      if (name === "fullname" && !fullnameRegex.test(value))
        errObj = { ...errObj, [name]: fnameValidateMsg };
      else if (name === "email" && !emailRegex.test(value))
        errObj = { ...errObj, [name]: invalidEmailMsg };
      else if (name === "address") {
        const msg = addressValidation(name, value, errObj);
        if (msg) errObj = { ...errObj, [name]: msg };
      } else if (name === "mobile" && value.length < 14) {
        errObj = {
          ...errObj,
          [name]: phoneDigitInvalidMsg,
        };
      } else if (name === "dob") {
        const msg = dateValidation(name, value, errObj);
        msg
          ? (errObj = { ...errObj, [name]: msg })
          : setValid({ ...valid, [name]: true });
      } else setValid({ ...valid, [name]: true });
      setErrors(errObj);
    }
  };

  const handleFormBlur = (value, name) => {
    if (value === "")
      setErrors({
        ...errors,
        [name]: name === "address" ? invalidAddressMsg : requiredFieldMsg,
      });
    else validationFormCheck(name, value);
  };

  const handleFocus = (key, key2 = "", key3 = "") => {
    let validObj = { ...valid, [key]: false };
    let focusObj = { ...focused, [key]: true };
    let errorObj = { ...errors, [key]: "" };
    if (key2 && key3) {
      validObj = { ...validObj, [key2]: false, [key3]: false };
      focusObj = { ...focusObj, [key2]: true, [key3]: true };
      errorObj = { ...errorObj, [key2]: "", [key3]: "" };
    }
    setValid(validObj);
    setFocused(focusObj);
    setErrors(errorObj);
  };

  const handleSubmit = () => {
    const isErrors = validationFormCheck();
    if (Object.keys(isErrors).length === 0) {
      setButtonLoader(true);
      // API Integratoin
      setTimeout(() => {
        setButtonLoader(false);
        window.location.href = process.env.REACT_APP_IMAGE_URL;
      }, 3000);
    }
  };

  const endIconComponent = (key) =>
    valid[key] ? (
      <CheckOutlinedIcon
        sx={{ color: "#00BFA5", margin: "0 10px !important" }}
        className="styled-textfield-icon"
      />
    ) : null;

  return (
    <Box className="right-section">
      <Typography className="singup-title">{singupLabel}</Typography>
      <Box component="div" width={320} marginTop="32px" className="welcome-box">
        <Grid container width="100%">
          <Paper className="signup-paper-wrapper">
            <Stack className="form-header">
              <BadgeIcon
                sx={{ marginRight: "8px", width: "20px", height: "20px" }}
              />
              <Typography sx={{ fontSize: "1.125rem", fontWeight: 500 }}>
                {yourInfoLabel}
              </Typography>
            </Stack>
            <Divider />
            <Input
              error={Boolean(errors.fullname)}
              label={!valid.fullname ? errors.fullname || fnameLabel : ""}
              focused={Boolean(errors.fullname) || focused.fullname}
              onChange={(event) =>
                handleInputChange("fullname", event.target.value)
              }
              onBlur={(e) => handleFormBlur(e.target.value, "fullname")}
              onFocus={() => {
                handleFocus("fullname");
              }}
              value={fullname}
              endIconComponent={endIconComponent("fullname")}
            />
            <Autocomplete
              // disableClearable
              popupIcon={
                valid.address ? (
                  <CheckOutlinedIcon
                    sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                    className="styled-textfield-icon"
                  />
                ) : (
                  <span className="styled-textfield-icon">
                    {editSvg(Boolean(errors.address))}
                  </span>
                )
              }
              {...defaultProps}
              sx={{
                [`& .${autocompleteClasses.popupIndicator}`]: {
                  transform: "none",
                },
              }}
              onChange={(_e, value) => {
                handleInputChange("address", value);
              }}
              value={address.address}
              onBlur={(_e) => handleFormBlur(_e.target.value, "address")}
              onFocus={() => {
                handleFocus("address", "city", "state");
              }}
              renderInput={(params) => (
                <TextField
                  label={!valid.address ? errors.address || addressLabel : ""}
                  className={`${Boolean(errors.address) && "error-input"} `}
                  error={Boolean(errors.address)}
                  focused={Boolean(errors.address) || focused.address}
                  variant="standard"
                  {...params}
                />
              )}
            />
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Input
                error={Boolean(errors.city)}
                label={
                  !valid.city
                    ? errors.city || (!address.state && cityLabel)
                    : ""
                }
                value={address.state}
                disabled
                endIconComponent={endIconComponent("address")}
              />
              <Input
                error={Boolean(errors.state)}
                label={
                  !valid.state
                    ? errors.state || (!address.state && stateLabel)
                    : ""
                }
                disabled
                value={address.country}
                endIconComponent={endIconComponent("address")}
              />
            </Stack>
            <Input
              error={Boolean(errors.mobile)}
              label={!valid.mobile ? errors.mobile || mobileLabel : ""}
              focused={Boolean(errors.mobile) || focused.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              onBlur={(e) => handleFormBlur(e.target.value, "mobile")}
              onFocus={() => {
                handleFocus("mobile");
              }}
              value={mobileValue}
              placeholder="(000) 000-0000"
              endIconComponent={endIconComponent("mobile")}
            />
            <Input
              value={dob}
              placeholder="MM/DD/YYYY"
              error={Boolean(errors.dob)}
              label={!valid.dob ? errors.dob || dobLabel : ""}
              focused={Boolean(errors.dob) || focused.dob}
              onChange={(e) => handleInputChange("dob", e.target.value)}
              onBlur={(e) => handleFormBlur(e.target.value, "dob")}
              onFocus={() => {
                handleFocus("dob");
              }}
              endIconComponent={endIconComponent("dob")}
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel>{genderLabel}</InputLabel>
              <Select
                className="gender-select"
                fullWidth
                error={Boolean(errors.gender)}
                label={!valid.gender ? errors.gender : genderLabel}
                onFocus={() => {
                  handleFocus("gender");
                }}
                onChange={(e) => {
                  handleInputChange("gender", e.target.value);
                }}
                onBlur={(e) => handleFormBlur(e.target.value, "gender")}
                value={gender}
                IconComponent={(props) =>
                  valid.gender ? (
                    <CheckOutlinedIcon
                      sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                      className="styled-textfield-icon"
                    />
                  ) : (
                    <KeyboardArrowDownOutlinedIcon
                      {...props}
                      className={`${props.className} styled-textfield-icon`}
                    />
                  )
                }
              >
                {genderValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid marginTop="28px">
          <Input
            variant="outlined"
            placeholder={emailLabel}
            endIcon={false}
            className="email-input"
            error={Boolean(errors.email)}
            focused={Boolean(errors.email) || focused.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={(e) => handleFormBlur(e.target.value, "email")}
            onFocus={() => {
              handleFocus("email");
            }}
            value={email}
            endIconComponent={endIconComponent("email")}
          />
          <Typography color="error" sx={{ fontSize: "0.75rem", mt: "8px" }}>
            {errors.email}
          </Typography>
          <LoadingButton
            fullWidth
            className="register-btn"
            sx={{ pt: "24px" }}
            startIcon={<MarkunreadIcon sx={{ mr: "8px" }} />}
            onClick={handleSubmit}
            loading={buttonLoader}
          >
            {continueEmail}
          </LoadingButton>
          <Terms />
        </Grid>
      </Box>
    </Box>
  );
};

export default RightSectionPreview;
