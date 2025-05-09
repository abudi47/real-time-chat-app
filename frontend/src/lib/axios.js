import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api", // Replace with your API base URL
  timeout: 5000, // Optional: Set a timeout for requests
  withCredentials: true,
});

export default api;
