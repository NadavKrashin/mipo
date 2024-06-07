import io from "socket.io-client";

const SERVER_URL = import.meta.env.PROD ? "" : "http://localhost:4000";

const socket = io(SERVER_URL, { transports: ["websocket"], secure: true }); // Adjust based on your backend server

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
