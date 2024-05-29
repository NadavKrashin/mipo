// src/components/ToggleSwitch.js
import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

const ToggleSwitch = ({ showOnlyAbsent, setShowOnlyAbsent }) => {
  return (
    <FormControlLabel
      sx={{ marginLeft: "10px" }}
      dir="rtl"
      control={
        <Switch
          checked={showOnlyAbsent}
          onChange={(e) => setShowOnlyAbsent(e.target.checked)}
        />
      }
      label="הצג חסרים"
    />
  );
};

export default ToggleSwitch;
