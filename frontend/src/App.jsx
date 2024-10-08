import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Attendance from "./views/Attendance";
import HomeUsers from "./views/HomeView";
import Login from "./components/Login";
import { fetchAttendanceData, getSegelUser } from "./api";
import {
  socket,
  subscribeToBulkUpdates,
  subscribeToUpdates,
  unsubscribeFromUpdates,
} from "./socket";
import Navbar from "./components/Navbar";
import ManageMamashView from "./views/ManageMamashView";
import { Box, CircularProgress } from "@mui/material";
import SummaryView from "./views/SummaryView";
import Footer from "./components/Footer";

const App = () => {
  const [attendance, setAttendance] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFetchingSegel, setIsFetchingSegel] = useState(false);

  useEffect(() => {
    const fetchUser = async (attendance) => {
      const savedUserId = JSON.parse(localStorage.getItem("userId"));

      if (savedUserId) {
        const user = attendance.find(({ _id }) => _id === savedUserId);

        if (user) {
          setCurrentUser(user);
        } else {
          setIsFetchingSegel(true);
          setCurrentUser(await getSegelUser());
        }

        setIsFetchingSegel(false);
      }
    };

    const fetchData = async () => {
      try {
        const data = await fetchAttendanceData();
        setAttendance(data);
        fetchUser(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();

    const handleVisibilityChange = () => {
      if (!socket.connected) {
        socket.connect();
        fetchData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleBulkUpdate = (key) => {
      setAttendance(() => {
        const update = { absentReason: "" };

        if (key === "present") {
          update.present = false;
        } else {
          update.isHome = false;
        }

        setCurrentUser({ ...currentUser, ...update });
        return attendance.map((user) => ({ ...user, ...update }));
      });
    };

    const handleUpdate = (updatedMember) => {
      if (updatedMember._id === currentUser._id) {
        setCurrentUser(updatedMember);
      }

      setAttendance((prevAttendance) =>
        prevAttendance.map((member) =>
          member._id === updatedMember._id ? updatedMember : member
        )
      );
    };

    subscribeToUpdates(handleUpdate);
    subscribeToBulkUpdates(handleBulkUpdate);

    return () => {
      unsubscribeFromUpdates();
    };
  }, [attendance.length, currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setCurrentUser(null);
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
                    setCurrentUser={setCurrentUser}
                  />
                }
              ></Route>
              {(currentUser.isAdmin || currentUser.isMamash) && (
                <Route
                  exact
                  path="/home-users"
                  element={
                    <HomeUsers
                      attendance={attendance}
                      setAttendance={setAttendance}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                ></Route>
              )}
              {currentUser.isAdmin && (
                <>
                  <Route
                    exact
                    path="/manage-mamash"
                    element={
                      <ManageMamashView
                        attendance={attendance}
                        setAttendance={setAttendance}
                        isSegel={currentUser.name === "סגל"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/summary"
                    element={<SummaryView />}
                  ></Route>
                </>
              )}
            </Routes>
            <Footer />
          </>
        ) : (
          <>
            {attendance.length && !isFetchingSegel ? (
              <Login attendance={attendance} setCurrentUser={setCurrentUser} />
            ) : (
              <Box
                sx={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={80} />
              </Box>
            )}
          </>
        )}
      </BrowserRouter>
    </main>
  );
};

export default App;
