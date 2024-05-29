// backend/server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: ["http://172.20.10.7:5173", "http://localhost:5173"],
};
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

let attendanceData = [
  {
    id: 1,
    name: "Admin User",
    team: "Team 1",
    phone: "1234567890",
    avatar: "",
    present: false,
    isHome: false,
    isAdmin: true,
    isMamash: false,
  },
  // Add more users with similar properties but isAdmin set to false and isHome randomly set to true or false
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 2,
    name: `User ${i + 2}`,
    team: `Team ${(i % 9) + 1}`,
    phone: `123456789${i + 1}`,
    avatar: "",
    present: false,
    isHome: Math.random() > 0.5,
    isAdmin: false,
    isMamash: false,
  })),
];

app.get("/attendance", (req, res) => {
  res.json(attendanceData);
});

app.get("/attendance", (req, res) => {
  res.json(attendanceData);
});

app.put("/users/:userId/mamash", (req, res) => {
  const user = attendanceData.find((user) => user.id === +req.params.userId);

  if (user) {
    attendanceData = attendanceData.map((currentUser) => {
      if (currentUser.team !== user.team) {
        return currentUser;
      }

      return {
        ...currentUser,
        isMamash: currentUser.id === user.id ? true : false,
      };
    });

    res.json(attendanceData);
  } else {
    res.status(404).send("User not found");
  }
});

app.get("/users/:username", (req, res) => {
  const user = attendanceData.find((user) => user.name === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("updateAttendance", (updatedMember) => {
    attendanceData = attendanceData.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );

    io.emit("attendanceUpdate", updatedMember);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("updateBulkAttendace", (key) => {
    attendanceData = attendanceData.map((member) => {
      if (key === "present") {
        return {
          ...member,
          present: false,
        };
      }
      return {
        ...member,
        isHome: false,
      };
    });

    io.emit("attendanceUpdateBulk", attendanceData);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
