// src/components/AttendanceList.js
import React, { useState } from "react";
import AttendanceItem from "./AttendanceItem";
import { List } from "@mui/material";

const AttendanceList = ({ attendance, handleCheckboxChange, handleCall }) => {
  return (
    <List>
      {attendance.map((member) => (
        <AttendanceItem
          key={member._id}
          member={member}
          handleCheckboxChange={handleCheckboxChange}
          handleCall={handleCall}
        />
      ))}
    </List>
  );
};

export default AttendanceList;
