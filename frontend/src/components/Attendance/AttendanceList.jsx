// src/components/AttendanceList.js
import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";

const AttendanceList = ({
  attendance,
  handleCheckboxChange,
  handleCall,
  //   handleHomeToggle,
}) => {
  return (
    <List>
      {attendance.map((member) => (
        <ListItem key={member.id}>
          <Checkbox
            edge="start"
            checked={member.present}
            onChange={() => handleCheckboxChange(member.id)}
          />
          <IconButton onClick={() => handleCall(member.phone)}>
            <PhoneIcon />
          </IconButton>

          <ListItemText primary={member.name} secondary={member.team} />

          <ListItemAvatar sx={{ marginRight: "5px" }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              badgeContent={member.isMamash && <StarIcon color="warning"/>}
            >
              <Avatar alt={member.name} src={member.avatar} />
            </Badge>
          </ListItemAvatar>
        </ListItem>
      ))}
    </List>
  );
};

export default AttendanceList;
