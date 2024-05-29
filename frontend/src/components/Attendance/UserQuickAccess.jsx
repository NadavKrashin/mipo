// src/components/UserQuickAccess.js
import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  IconButton,
  Avatar,
} from "@mui/material";

const UserQuickAccess = ({ user, handleCheckboxChange }) => {
  return (
    <ListItem>
      <Checkbox
        edge="start"
        checked={user.present}
        onChange={() => handleCheckboxChange(user.id)}
      />

      <ListItemText primary={user.name} secondary={user.team} />
      <ListItemAvatar>
        <Avatar alt={user.name} src={user.avatar} />
      </ListItemAvatar>
    </ListItem>
  );
};

export default UserQuickAccess;
