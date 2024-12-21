import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/perumahan",
});

// Ambil semua data perumahan
export const getAll = () => API.get("/detail");

// Ambil data perumahan berdasarkan ID
export const getById = (id) => API.get(`/detail/${id}`);

export const getUniqueValues = (column) =>
  API.get(`/unique-values?column=${column}`);
