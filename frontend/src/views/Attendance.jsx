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

import { sendUpdate, sendBulkUpdate } from "../socket";

const Attendance = ({
  attendance,
  setAttendance,
  currentUser,
  setCurrentUser,
}) => {
  const [showOnlyAbsent, setShowOnlyAbsent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [presentCount, setPresentCount] = useState(0);

  useEffect(() => {
    setPresentCount(attendance.filter((member) => member.present).length);
  }, [attendance]);

  useEffect(() => {
    currentUser && !currentUser.isAdmin && setSelectedTeams([currentUser.team]);
  }, [currentUser._id]);

  const handleCheckboxChange = (id) => {
    const newAttendance = attendance.map((updatedMember) =>
      updatedMember._id === id
        ? {
            ...updatedMember,
            present: !updatedMember.present,
            absentReason: "",
          }
        : updatedMember
    );

    setAttendance(newAttendance);
    const newUser = newAttendance.find(({ _id: currId }) => currId === id);

    if (id === currentUser._id) {
      setCurrentUser(newUser);
    }

    sendUpdate(newUser._id, { present: newUser.present, absentReason: "" });
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleHomeToggle = (id) => {
    const newAttendance = attendance.map((updatedMember) =>
      updatedMember._id === id
        ? { ...updatedMember, isHome: !updatedMember.isHome }
        : updatedMember
    );

    setAttendance(newAttendance);

    const newUser = newAttendance.find(({ _id: currId }) => currId === id);

    setCurrentUser(newUser);
    sendUpdate(newUser._id, { isHome: newUser.isHome });
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
    if (!currentUser.isMamash) {
      sendBulkUpdate("present");
      setAttendance(
        attendance.map((user) => ({
          ...user,
          present: false,
          absentReason: "",
        }))
      );
    } else {
      setAttendance(
        attendance.map((user) => {
          if (user.team === currentUser.team) {
            sendUpdate(user._id, { present: false, absentReason: "" });
            return { ...user, present: false, absentReason: "" };
          }

          return user;
        })
      );
      setCurrentUser({ ...currentUser, present: false, absentReason: "" });
    }
  };

  return (
    <main>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
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
                sx={{ mb: 2, ml: 2, mr: 1 }}
              />
              {(currentUser.isAdmin ||
                (currentUser.isMamash &&
                  selectedTeams.length == 1 &&
                  selectedTeams[0] == currentUser.team)) && (
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
                onClick={() => handleHomeToggle(currentUser._id)}
                sx={{ ml: 2, mb: 2, width: 40, height: 40 }}
              >
                {currentUser.isHome ? <ApartmentIcon /> : <HomeIcon />}
              </Fab>
              <Fab
                color={currentUser.present ? "error" : "success"}
                onClick={() => handleCheckboxChange(currentUser._id)}
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
    </main>
  );
};

export default Attendance;
