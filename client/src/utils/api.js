import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Ambil semua data perumahan
export const getAll = () => API.get("/perumahan");

// Ambil data perumahan berdasarkan ID
export const getById = (id) => API.get(`/perumahan/${id}`);
