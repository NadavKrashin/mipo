// src/components/Attendance.js
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Chip, Fab } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt"; // Importing an icon to use with the button
import SearchBar from "../components/Attendance/SearchBar";
import ToggleSwitch from "../components/Attendance/ToggleSwitch";
import AttendanceList from "../components/Attendance/AttendanceList";
import TeamFilter from "../components/Attendance/TeamFilter";
import HomeIcon from "@mui/icons-material/Home";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import ApartmentIcon from "@mui/icons-material/Apartment";

import {
  subscribeToUpdates,
  subscribeToBulkUpdates,
  unsubscribeFromUpdates,
  sendUpdate,
  sendBulkUpdate,
} from "../socket";

const Attendance = ({ attendance, setAttendance, currentUser }) => {
  const [showOnlyAbsent, setShowOnlyAbsent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [presentCount, setPresentCount] = useState(0);

  const handleUpdate = useCallback(
    () => (updatedMember) => {
      setAttendance((prevAttendance) =>
        prevAttendance.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        )
      );
    },
    [setAttendance]
  );

  useEffect(() => {
    subscribeToUpdates(handleUpdate);
    subscribeToBulkUpdates((data) => setAttendance(data));

    return () => {
      unsubscribeFromUpdates();
    };
  }, []);

  useEffect(() => {
    setPresentCount(attendance.filter((member) => member.present).length);
  }, [attendance]);

  useEffect(() => {
    currentUser && !currentUser.isAdmin && setSelectedTeams([currentUser.team]);
  }, [currentUser]);

  const handleCheckboxChange = (id) => {
    const newAttendance = attendance.map((updatedMember) =>
      updatedMember.id === id
        ? { ...updatedMember, present: !updatedMember.present }
        : updatedMember
    );

    setAttendance(newAttendance);

    sendUpdate(newAttendance.find(({ id: currId }) => currId === id));
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleHomeToggle = (id) => {
    const newAttendance = attendance.map((updatedMember) =>
      updatedMember.id === id
        ? { ...updatedMember, isHome: !updatedMember.isHome }
        : updatedMember
    );

    setAttendance(newAttendance);

    sendUpdate(newAttendance.find(({ id: currId }) => currId === id));
  };

  const filteredAttendance = useMemo(
    () =>
      attendance.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!showOnlyAbsent || !member.present) &&
          (selectedTeams.length === 0 || selectedTeams.includes(member.team))
      ),
    [attendance, searchQuery, selectedTeams, showOnlyAbsent]
  );

  const handleReset = () => {
    sendBulkUpdate("present");
  };

  return (
    <main>
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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
            <ToggleSwitch
              showOnlyAbsent={showOnlyAbsent}
              setShowOnlyAbsent={setShowOnlyAbsent}
            />
            <TeamFilter
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Chip
                label={`נמצאים: ${attendance.length} / ${presentCount}`}
                color="primary"
                variant="outlined"
                direction="rtl"
                sx={{ mb: 2, ml: 2 }}
              />
              {currentUser.isAdmin && (
                <Fab
                  color="primary"
                  onClick={handleReset}
                  sx={{ ml: 2, mb: 2, width: 40, height: 40 }}
                >
                  <RestartAltIcon />
                </Fab>
              )}
            </Box>
            <Box>
              <Fab
                color={currentUser.isHome ? "warning" : "primary"}
                onClick={() => handleHomeToggle(currentUser.id)}
                sx={{ ml: 2, mb: 2, width: 40, height: 40 }}
              >
                {currentUser.isHome ? <ApartmentIcon /> : <HomeIcon />}
              </Fab>
              <Fab
                color={currentUser.present ? "error" : "success"}
                onClick={() => handleCheckboxChange(currentUser.id)}
                sx={{ ml: 2, mb: 2, width: 40, height: 40 }}
              >
                {currentUser.present ? (
                  <LocationOffIcon />
                ) : (
                  <WhereToVoteIcon />
                )}
              </Fab>
            </Box>
          </Box>

          <AttendanceList
            attendance={filteredAttendance}
            handleCheckboxChange={handleCheckboxChange}
            handleCall={handleCall}
          />
        </Box>
      </Box>
      )
    </main>
  );
};

export default Attendance;
