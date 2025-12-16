import axios from "axios";

const API = "http://localhost:8000/notes";


export const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchNotes = (params = {}) =>
  axios.get(`${API}/my-notes`, {
    headers: getAuthHeader(),
    params,
  });

export const createNote = (data) =>
  axios.post(`${API}/create`, data, {
    headers: getAuthHeader(),
  });

export const updateNote = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    headers: getAuthHeader(),
  });

export const deleteNote = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: getAuthHeader(),
  });
