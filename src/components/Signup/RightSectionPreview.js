import React, { useState } from "react";
import {
  Autocomplete,
  autocompleteClasses,
  Box,
  Button,
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
import { singupLabel } from "../../utils/messages";
import {
  editSvg,
  emailRegex,
  fullnameRegex,
  genderValue,
} from "../../utils/constant";
import Input from "../Common/Input";
import locationData from "../../utils/locationData.json";
import Terms from "./Terms";

const RightSectionPreview = () => {
  const [mobileValue, setMobileValue] = useState("");
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState({});
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState({});
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({
    fullname: false,
    mobile: false,
    date: false,
    address: false,
    dob: false,
  });

  const defaultProps = {
    options: locationData,
    getOptionLabel: (option) => option.address,
  };

  const handleMobileChange = (value) => {
    if (value.length <= 10) {
      const inputValue = value.replace(/\D/g, ""); // Remove non-digits
      const formattedValue = inputValue.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "($1) $2-$3"
      );
      setMobileValue(formattedValue);
    }
  };

  const handleDOBChange = (value, name) => {
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
    else if (name === "dob") handleDOBChange(value, name);
    else if (name === "fullname") setFullName(value);
    else if (name === "email") setEmail(value);
    else if (name === "gender") setGender(value);
  };

  const fieldArr = [
    "fullname",
    "mobile",
    "address",
    "city",
    "state",
    "dob",
    "email",
    "gender",
  ];
  const validationFormCheck = (name, value) => {
    if (!(name && value)) {
      let err = {};
      fieldArr.forEach((item) => {
        if (!valid[item]) {
          err = { ...err, [item]: "Required field." };
        }
      });
      setErrors(err);
    } else {
      let errObj = { ...errors };
      if (name === "fullname" && !fullnameRegex.test(value)) {
        errObj = { ...errObj, [name]: "Add both first and last name" };
      } else if (name === "dob") {
        if (value.length !== 10) {
          errObj = { ...errObj, [name]: "Invalid format - must be MM/DD/YYYY" };
        } else {
          let errorMsg = "";
          const [month, day, year] = value
            .split("/")
            .map((num) => parseInt(num, 10));

          // Validate date components
          if (month < 1 || month > 12 || day < 1 || day > 31) {
            errorMsg = "Invalid date of birth";
          } else if (year < 1900)
            errorMsg = "You must be born after 1900 to register on this site.";
          else {
            const inputDate = new Date(year, month - 1, day);
            const currentDate = new Date();
            if (inputDate > currentDate) {
              errorMsg = "Invalid date of birth";
            }
          }
          if (errorMsg) errObj = { ...errObj, [name]: errorMsg };
          else setValid({ ...valid, [name]: true });
        }
      } else if (name === "mobile") {
        if (value.length < 14)
          errObj = {
            ...errObj,
            [name]: "Phone number must be at least 10 digits",
          };
        else setValid({ ...valid, [name]: true });
      } else if (name === "address") {
        const result = locationData.some((item) => item.address === value);
        if (!result) {
          errObj = {
            ...errObj,
            [name]: "Invalid address. Please select from suggestions.",
          };
          setAddress("");
        } else setValid({ ...valid, [name]: true, city: true, state: true });
      } else if (name === "email") {
        const result = emailRegex.test(value);
        if (!result) errObj = { ...errObj, [name]: "Invalid email" };
        else setValid({ ...valid, [name]: true });
      } else {
        setValid({ ...valid, [name]: true });
      }
      setErrors(errObj);
    }
  };

  const handleFormBlur = (value, name) => {
    if (value === "")
      setErrors({
        ...errors,
        [name]:
          name === "address"
            ? "Invalid Address. Please select from suggestions"
            : "Requied field.",
      });
    else validationFormCheck(name, value);
  };

  console.log(valid, errors.gender);
  return (
    <Box className="right-section">
      <Typography className="singup-title">{singupLabel}</Typography>
      <Box component="div" width={320} marginTop="32px">
        <Grid container width="100%">
          <Paper className="signup-paper-wrapper">
            <Stack className="form-header">
              <BadgeIcon
                sx={{ marginRight: "8px", width: "20px", height: "20px" }}
              />
              <Typography sx={{ fontSize: "1.125rem", fontWeight: 500 }}>
                Your Information
              </Typography>
            </Stack>
            <Divider />
            <Input
              error={Boolean(errors.fullname)}
              label={!valid.fullname ? errors.fullname || "Full Name" : ""}
              focused={Boolean(errors.fullname) || focused.fullname}
              onChange={(event) =>
                handleInputChange("fullname", event.target.value)
              }
              onBlur={(e) => handleFormBlur(e.target.value, "fullname")}
              onFocus={() => {
                setValid({ ...valid, fullname: false });
                setFocused({ ...focused, fullname: true });
                setErrors({ ...errors, fullname: "" });
              }}
              value={fullname}
              endIconComponent={
                valid.fullname ? (
                  <CheckOutlinedIcon
                    sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                    className="styled-textfield-icon"
                  />
                ) : null
              }
            />
            <Autocomplete
              disableClearable
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
                setValid({
                  ...valid,
                  address: false,
                  city: false,
                  state: false,
                });
                setFocused({
                  ...focused,
                  address: true,
                  city: true,
                  state: true,
                });
                setErrors({ ...errors, address: "", city: "", state: "" });
              }}
              renderInput={(params) => (
                <TextField
                  label={
                    !valid.address
                      ? errors.address || `Street address (e.g. "1 Elm Way")`
                      : ""
                  }
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
                  !valid.city ? errors.city || (!address.state && "City") : ""
                }
                value={address.state}
                disabled
                endIconComponent={
                  valid.address ? (
                    <CheckOutlinedIcon
                      sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                      className="styled-textfield-icon"
                    />
                  ) : null
                }
              />
              <Input
                error={Boolean(errors.state)}
                label={
                  !valid.state
                    ? errors.state || (!address.state && "State")
                    : ""
                }
                disabled
                value={address.country}
                endIconComponent={
                  valid.address ? (
                    <CheckOutlinedIcon
                      sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                      className="styled-textfield-icon"
                    />
                  ) : null
                }
              />
            </Stack>
            <Input
              error={Boolean(errors.mobile)}
              label={!valid.mobile ? errors.mobile || "Mobile number" : ""}
              focused={Boolean(errors.mobile) || focused.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              onBlur={(e) => handleFormBlur(e.target.value, "mobile")}
              onFocus={() => {
                setValid({ ...valid, mobile: false });
                setFocused({ ...focused, mobile: true });
                setErrors({ ...errors, mobile: "" });
              }}
              value={mobileValue}
              placeholder="(000) 000-0000"
              endIconComponent={
                valid.mobile ? (
                  <CheckOutlinedIcon
                    sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                    className="styled-textfield-icon"
                  />
                ) : null
              }
            />
            <Input
              value={dob}
              placeholder="MM/DD/YYYY"
              error={Boolean(errors.dob)}
              label={!valid.dob ? errors.dob || "Date of birth" : ""}
              focused={Boolean(errors.dob) || focused.dob}
              onChange={(e) => handleInputChange("dob", e.target.value)}
              onBlur={(e) => handleFormBlur(e.target.value, "dob")}
              onFocus={() => {
                setValid({ ...valid, dob: false });
                setFocused({ ...focused, dob: true });
                setErrors({ ...errors, dob: "" });
              }}
              endIconComponent={
                valid.dob ? (
                  <CheckOutlinedIcon
                    sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                    className="styled-textfield-icon"
                  />
                ) : null
              }
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                className="gender-select"
                fullWidth
                error={Boolean(errors.gender)}
                label={!valid.gender ? errors.gender : "Gender"}
                onFocus={() => {
                  setValid({ ...valid, gender: false });
                  setFocused({ ...focused, gender: true });
                  setErrors({ ...errors, gender: "" });
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
            placeholder="Email"
            endIcon={false}
            className="email-input"
            error={Boolean(errors.email)}
            focused={Boolean(errors.email) || focused.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={(e) => handleFormBlur(e.target.value, "email")}
            onFocus={() => {
              setValid({ ...valid, email: false });
              setFocused({ ...focused, email: true });
              setErrors({ ...errors, email: "" });
            }}
            value={email}
            endIconComponent={
              valid.email ? (
                <CheckOutlinedIcon
                  sx={{ color: "#00BFA5", margin: "0 10px !important" }}
                  className="styled-textfield-icon"
                />
              ) : null
            }
          />
          <Typography color="error" sx={{ fontSize: "0.75rem", mt: "8px" }}>
            {errors.email}
          </Typography>
          <Button
            fullWidth
            className="register-btn"
            sx={{
              paddingTop: "24px",
            }}
            startIcon={<MarkunreadIcon sx={{ mr: "8px" }} />}
            onClick={validationFormCheck}
          >
            Continue with email
          </Button>
          <Terms />
        </Grid>
      </Box>
    </Box>
  );
};

export default RightSectionPreview;
