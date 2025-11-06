
import axios from "axios";

const API_URL = "https://admin-crm.onrender.com"; 

export const getStudents = async () => {
  try {
    const res = await axios.get(`${API_URL}/students`);
    return res.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const getTeachers = async () => {
  try {
    const res = await axios.get(`${API_URL}/teachers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
};

export const getAdmins = async () => {
  try {
    const res = await axios.get(`${API_URL}/admins`);
    return res.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
};

export const getManagers = async () => {
  try {
    const res = await axios.get(`${API_URL}/managers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching managers:", error);
    return [];
  }
};

export const getCourses = async () => {
  try {
    const res = await axios.get(`${API_URL}/courses`);
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
