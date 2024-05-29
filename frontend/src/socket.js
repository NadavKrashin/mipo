import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Adjust based on your backend server

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

export const sendUpdate = (updatedMember) => {
  socket.emit("updateAttendance", updatedMember);
};

export const sendBulkUpdate = (key) => {
  socket.emit("updateBulkAttendace", key);
};
