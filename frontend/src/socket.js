import io from "socket.io-client";

const SERVER_URL = import.meta.env.PROD ? "" : "http://localhost:4000";

export const socket = io(SERVER_URL, {
  transports: ["websocket"],
  secure: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export const subscribeToUpdates = (callback) => {
  socket.on("attendanceUpdate", callback);
};

export const subscribeToBulkUpdates = (handleBulkUpdate) => {
  socket.on("attendanceUpdateBulk", handleBulkUpdate);
};

export const unsubscribeFromUpdates = () => {
  socket.off("attendanceUpdate");
  socket.off("attendanceUpdateBulk");
};

export const sendUpdate = (id, updatedProperties) => {
  socket.emit("updateAttendance", id, updatedProperties);
};

export const sendBulkUpdate = (key) => {
  socket.emit("updateBulkAttendance", key);
};
