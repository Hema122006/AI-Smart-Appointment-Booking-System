import axios from "axios";

const API = "https://ai-smart-appointment-booking-system-2.onrender.com/api";

export const getDashboard = () =>
    axios.get(`${API}/dashboard`);