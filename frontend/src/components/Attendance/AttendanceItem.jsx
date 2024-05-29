// src/components/AttendanceItem.js
import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

const AttendanceItem = ({ member, handleCheckboxChange, handleCall }) => {
  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
      <Checkbox
        edge="start"
        checked={member.present}
        tabIndex={-1}
        disableRipple
        onChange={() => handleCheckboxChange(member.id)}
      />
      <IconButton
        edge="start"
        aria-label="call"
        onClick={() => handleCall(member.phone)}
      >
        <PhoneIcon />
      </IconButton>
      <ListItemText primary={member.name} secondary={member.team} />
      <ListItemAvatar>
        <Avatar alt={member.name} src={member.avatar} />
      </ListItemAvatar>
    </ListItem>
  );
};

export default AttendanceItem;
