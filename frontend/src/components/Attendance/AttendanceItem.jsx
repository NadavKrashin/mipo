import { useEffect, useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Box,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import SaveIcon from "@mui/icons-material/Save";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { sendUpdate } from "../../socket";
import AvatarItem from "./AvatarItem";

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

  const renderAbsentInput = (member) => {
    const uniqueId = uuidv4();

    return (
      <>
        {!absentReason && (
          <InputLabel shrink htmlFor={uniqueId}>
            איפה?
          </InputLabel>
        )}
        <OutlinedInput
          value={absentReason}
          onChange={(e) => setAbsentReason(e.target.value)}
          size="small"
          id={uniqueId}
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
      </>
    );
  };

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
        {renderAbsentInput(member)}
      </FormControl>

      <ListItemText primary={member.name} secondary={member.team} />
      <AvatarItem member={member} />
    </ListItem>
  );
};

export default AttendanceItem;
