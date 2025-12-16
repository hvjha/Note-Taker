import axios from "axios";

// const API = "http://localhost:8000/user";
const API = "https://note-taker-backend-0otv.onrender.com/user";

export const loginUser = (data) =>
  axios.post(`${API}/login`, data, {
    headers: { "Content-Type": "application/json" },
  });

export const signupUser = (data) =>
  axios.post(`${API}/register`, data, {
    headers: { "Content-Type": "application/json" },
  });

export const verifyEmail = (token) =>
  axios.post(
    `${API}/verify`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const forgotPassword = (email) =>
  axios.post(`${API}/forgot-password`, { email });

export const verifyOtp = (email, otp) =>
  axios.post(`${API}/verify-otp/${email}`, { otp });

export const changePassword = (email, data) =>
  axios.post(`${API}/change-password/${email}`, data);
