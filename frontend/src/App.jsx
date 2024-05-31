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

  const currentUser = useMemo(
    () =>
      attendance.length && localStorageUser
        ? attendance.find(({ id }) => id === localStorageUser.id)
        : null,
    [localStorageUser]
  );

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setLocalStorageUser(savedUser);
      }
    };

    fetchUser();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAttendanceData();
        setAttendance(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocalStorageUser(null);
  };

  return (
    <main>
      <BrowserRouter>
        {currentUser ? (
          <>
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
          </>
        ) : (
          <Login
            attendance={attendance}
            setLocalStorageUser={setLocalStorageUser}
          />
        )}
      </BrowserRouter>
    </main>
  );
};

export default App;
