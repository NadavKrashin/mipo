import axios from "axios";

const SERVER_URL = import.meta.env.PROD ? "" : "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: SERVER_URL, // Adjust based on your backend server
});

export const fetchAttendanceData = async () => {
  const response = await axiosInstance.get("/attendance");
  return response.data;
};

export const updateUserMamashStatus = async (userId) => {
  return (await axiosInstance.put(`/users/${userId}/mamash`)).data;
};
