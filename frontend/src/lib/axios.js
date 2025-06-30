import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MODE === "develepment" ? "http://localhost:5001/api": "/api", // Replace with your API base URL
  timeout: 5000, // Optional: Set a timeout for requests
  withCredentials: true,
});

export default api;
