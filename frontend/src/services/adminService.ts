import axios from "axios";

const API = "http://localhost:8080/api";

export const getDashboard = () =>
    axios.get(`${API}/dashboard`);