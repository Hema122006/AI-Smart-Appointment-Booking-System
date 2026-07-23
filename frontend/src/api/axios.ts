import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-smart-appointment-booking-system-2.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;