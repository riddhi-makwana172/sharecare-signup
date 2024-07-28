import { TextField } from "@mui/material";
import React from "react";
import { editSvg } from "../../utils/constant";

const Input = ({
  label,
  onChange,
  value,
  error,
  placeholder = "",
  variant = "standard",
  endIcon = true,
  endIconComponent = null,
  className = "",
  ...props
}) => {
  return (
    <TextField
      autoComplete="off"
      className={`${className} ${error && "error-input"}`}
      error={error}
      id="standard-basic"
      label={label}
      onChange={onChange}
      value={value}
      variant={variant}
      placeholder={placeholder}
      fullWidth
      InputProps={
        endIcon
          ? {
              endAdornment: endIconComponent || (
                <span className="styled-textfield-icon">{editSvg(error)}</span>
              ),
            }
          : {}
      }
      {...props}
    />
  );
};

export default Input;
