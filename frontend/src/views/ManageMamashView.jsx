import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Switch,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { updateUserMamashStatus } from "../api"; // API functions for fetching and updating users

const ManageMamashView = ({ attendance, setAttendance }) => {
  const handleMamashToggle = async (userId) => {
    try {
      const updatedAttendance = await updateUserMamashStatus(userId);
      setAttendance(updatedAttendance);
    } catch (error) {
      console.error("Error updating Mamash status:", error);
    }
  };

  const groupedUsers = attendance.reduce((groups, user) => {
    if (!groups[user.team]) {
      groups[user.team] = [];
    }
    groups[user.team].push(user);
    return groups;
  }, {});

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        bgcolor: "background.paper",
        mx: "auto",
        my: 2,
        direction: "rtl",
      }}
    >
      {Object.keys(groupedUsers).map((team) => (
        <Box key={team} sx={{ mb: 2 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">צוות {team}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {groupedUsers[team].map((user) => (
                  <ListItem
                    key={user.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                    <Switch
                      checked={user.isMamash}
                      onChange={() => handleMamashToggle(user.id)}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default ManageMamashView;
