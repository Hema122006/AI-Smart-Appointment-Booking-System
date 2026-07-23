import axios from "axios";

const API = "http://ai-smart-appointment-booking-system-2.onrender.com";

export const getDashboard = () =>
    axios.get(`${API}/dashboard`);