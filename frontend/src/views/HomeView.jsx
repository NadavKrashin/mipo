// src/components/HomeUsers.js
import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SearchBar from "../components/Attendance/SearchBar";
import TeamFilter from "../components/Attendance/TeamFilter";
import RestartAltIcon from "@mui/icons-material/RestartAlt"; // Importing an icon to use with the button
import { sendBulkUpdate } from "../socket";

const HomeView = ({
  attendance,
  setAttendance,
  currentUser,
  setCurrentUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const filteredHomeUsers = useMemo(
    () =>
      attendance.filter(
        (user) =>
          user.isHome &&
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedTeams.length === 0 || selectedTeams.includes(user.team))
      ),
    [searchQuery, selectedTeams, attendance]
  );

  const handleReset = () => {
    setAttendance(attendance.map((user) => ({ ...user, isHome: false })));
    setCurrentUser({ ...currentUser, isHome: false });
    sendBulkUpdate("isHome");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mx: "auto",
        my: 2,
        direction: "rtl",
      }}
    >
      <Box sx={{ mt: 2 }}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TeamFilter
            selectedTeams={selectedTeams}
            setSelectedTeams={setSelectedTeams}
          />
        </Box>
        <Chip
          label={`בבית: ${attendance.length} / ${filteredHomeUsers.length} `}
          color="primary"
          variant="outlined"
          sx={{ mb: 2, ml: 2, fontSize: "1rem", padding: "10px" }}
        />
        <Fab
          color="primary"
          onClick={handleReset}
          sx={{ ml: 2, mb: 2, width: 40, height: 40 }}
        >
          <RestartAltIcon />
        </Fab>
        <List>
          {filteredHomeUsers.map((user) => (
            <ListItem
              key={user._id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.team} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default HomeView;
