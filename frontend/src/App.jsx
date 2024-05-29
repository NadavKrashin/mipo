// src/App.js
import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Attendance from "./views/Attendance";
import HomeUsers from "./views/HomeView";
import Login from "./components/Login";
import { fetchAttendanceData } from "./api";
import { subscribeToUpdates, unsubscribeFromUpdates } from "./socket";
import Navbar from "./components/Navbar";
import ManageMamashView from "./views/ManageMamashView";

const App = () => {
  const [attendance, setAttendance] = useState([]);
  const [localStorageUser, setLocalStorageUser] = useState();

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setLocalStorageUser(savedUser);
      }
    };

    const fetchData = async () => {
      try {
        const data = await fetchAttendanceData();
        setAttendance(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchUser();
    fetchData();

    const handleUpdate = (updatedMember) => {
      setAttendance((prevAttendance) =>
        prevAttendance.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        )
      );
    };

    subscribeToUpdates(handleUpdate);

    return () => {
      unsubscribeFromUpdates();
    };
  }, []);

  const currentUser = useMemo(
    () =>
      attendance.length && localStorageUser
        ? attendance.find(({ id }) => id === localStorageUser.id)
        : null,
    [attendance, localStorageUser]
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocalStorageUser(null);
  };

  if (!localStorageUser) {
    return (
      <Login
        attendance={attendance}
        setLocalStorageUser={setLocalStorageUser}
      />
    );
  }

  return (
    <main>
      {currentUser ? (
        <BrowserRouter>
          <Navbar
            onLogout={handleLogout}
            isAdmin={currentUser.isAdmin}
            isMamash={currentUser.isMamash}
          ></Navbar>
          <Routes>
            <Route
              path="/"
              element={
                <Attendance
                  attendance={attendance}
                  setAttendance={setAttendance}
                  currentUser={currentUser}
                />
              }
            ></Route>
            {(currentUser.isAdmin || currentUser.isMamash) && (
              <Route
                exact
                path="/home-users"
                element={
                  <HomeUsers
                    attendace={attendance}
                    setAttendance={setAttendance}
                  />
                }
              ></Route>
            )}
            {currentUser.isAdmin && (
              <Route
                exact
                path="/manage-mamash"
                element={
                  <ManageMamashView
                    attendance={attendance}
                    setAttendance={setAttendance}
                  />
                }
              ></Route>
            )}
          </Routes>
        </BrowserRouter>
      ) : (
        <></>
      )}
    </main>
  );
};

export default App;
