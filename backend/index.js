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
  pingInterval: 10000,
  pingTimeout: 5000,
});

require("./DBConnection");
const path = __dirname + "/views/";
const PORT = process.env.PORT || 4000;
const { User } = require("./models/User");

app.use(cors());
app.use(express.json());

app.use(express.static(path));

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/segel", async (req, res) => {
  try {
    res.json(await User.findOne({ name: "סגל" }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const getAllUsers = async () =>
  User.find({ name: { $ne: "סגל" } }).sort({
    team: 1,
  });

app.get("/attendance", async (req, res) => {
  try {
    res.json(await getAllUsers());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/users/:userId/mamash", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    await User.updateMany({ team: user.team }, { $set: { isMamash: false } });

    await User.findByIdAndUpdate(
      req.params.userId,
      { isMamash: true },
      { new: true }
    );

    res.json(await getAllUsers());
  } else {
    res.status(404).send("User not found");
  }
});

app.patch("/users/:userId/admin", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    await User.updateMany(
      { name: { $ne: "סגל" } },
      { $set: { isAdmin: false } }
    );

    await User.findByIdAndUpdate(
      req.params.userId,
      { isAdmin: true, isMamash: false },
      { new: true }
    );

    res.json(await getAllUsers());
  } else {
    res.status(404).send("User not found");
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("updateAttendance", async (id, update) => {
    io.emit(
      "attendanceUpdate",
      await User.findByIdAndUpdate(id, update, {
        new: true,
      })
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("updateBulkAttendance", async (key) => {
    const update = { absentReason: "" };

    if (key === "present") {
      update.present = false;
    } else {
      update.isHome = false;
    }

    await User.updateMany({}, { $set: { ...update } });

    io.emit("attendanceUpdateBulk", key);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
