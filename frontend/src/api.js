import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Adjust based on your backend server
});

export const fetchAttendanceData = async () => {
  const response = await axiosInstance.get("/attendance");
  return response.data;
};

export const fetchUserData = async (username) => {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
};

export const updateUserMamashStatus = async (userId) => {
  return (await axiosInstance.put(`/users/${userId}/mamash`)).data;
};
