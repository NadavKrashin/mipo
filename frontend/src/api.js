import axios from "axios";

const SERVER_URL = import.meta.env.PROD ? "" : "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export const fetchAttendanceData = async () => {
  return (await axiosInstance.get("/attendance")).data;
};

export const getSegelUser = async () => {
  return (await axiosInstance.get("/segel")).data;
};

export const updateUserMamashStatus = async (userId) => {
  return (await axiosInstance.patch(`/users/${userId}/mamash`)).data;
};

export const updateUserAdminStatus = async (userId) => {
  return (await axiosInstance.patch(`/users/${userId}/admin`)).data;
};
