import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Ambil semua data perumahan
export const getAll = () => API.get("/perumahan/detail");

// Ambil data perumahan berdasarkan ID
export const getById = (id) => API.get(`/perumahan/detail/${id}`);

export const getUniqueValues = (column) =>
  API.get(`/perumahan/unique-values?column=${column}`);
export const createPerumahan = (data) =>
  API.post("/perumahan/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePerumahan = (id) => API.delete(`/perumahan/${id}`);

export const toLogin = (data) => API.post("/auth/login", data);
export const toLogout = () => API.get("/auth/logout");
