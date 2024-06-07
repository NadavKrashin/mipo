// src/components/AttendanceItem.js
import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Avatar,
  ListItemAvatar,
  Badge,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Box,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import StarIcon from "@mui/icons-material/Star";
import SaveIcon from "@mui/icons-material/Save";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { sendUpdate } from "../../socket";

const AttendanceItem = ({ member, handleCheckboxChange, handleCall }) => {
  const [absentReason, setAbsentReason] = useState(member.absentReason);
  const handleSave = () => {
    if (absentReason !== member.absentReason) {
      sendUpdate(member._id, { present: false, absentReason });
    }
  };

  useEffect(() => {
    setAbsentReason(member.absentReason);
  }, [member.absentReason]);

  return (
    <ListItem key={member._id} sx={{ paddingRight: 1 }}>
      <Checkbox
        edge="start"
        checked={member.present}
        sx={{ paddingRight: "5px" }}
        onChange={() => handleCheckboxChange(member._id)}
        icon={
          member.absentReason ? (
            <IndeterminateCheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )
        }
      />
      <Box sx={{ marginLeft: "2%" }}>
        {member.phone ? (
          <IconButton onClick={() => handleCall(member.phone)}>
            <PhoneIcon />
          </IconButton>
        ) : (
          <IconButton disabled>
            <PhoneDisabledIcon />
          </IconButton>
        )}
      </Box>
      <FormControl
        dir="rtl"
        sx={{ minWidth: "35%", maxWidth: "35%" }}
        variant="filled"
      >
        {!absentReason && (
          <InputLabel shrink htmlFor="absent-reason-input">
            איפה?
          </InputLabel>
        )}
        <OutlinedInput
          value={absentReason}
          onChange={(e) => setAbsentReason(e.target.value)}
          size="small"
          id="absent-reason-input"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={
                  member.absentReason === absentReason && !!member.absentReason
                }
                aria-label="toggle password visibility"
                onClick={handleSave}
                edge="end"
              >
                <SaveIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <ListItemText primary={member.name} secondary={member.team} />
      <ListItemAvatar sx={{ marginRight: "5px" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          badgeContent={member.isMamash && <StarIcon color="warning" />}
        >
          <Avatar
            alt={member.name}
            src={
              member.avatar
                ? member.avatar
                : `https://api.dicebear.com/8.x/adventurer/svg?seed=${member.name}`
            }
          />
        </Badge>
      </ListItemAvatar>
    </ListItem>
  );
};

export default AttendanceItem;
