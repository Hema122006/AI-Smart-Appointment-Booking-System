import axios from "axios";

const API = "https://ai-smart-appointment-booking-system-2.onrender.com/api/admin";

export const getAppointments = () =>
  axios.get(`${API}/appointments`);

export const searchAppointments = (keyword: string) =>
  axios.get(`${API}/appointments/search?keyword=${keyword}`);

export const completeAppointment = (id: number) =>
  axios.put(`${API}/appointments/${id}/complete`);

export const cancelAppointment = (id: number) =>
  axios.put(`${API}/appointments/${id}/cancel`);

export const deleteAppointment = (id: number) =>
  axios.delete(`${API}/appointments/${id}`);