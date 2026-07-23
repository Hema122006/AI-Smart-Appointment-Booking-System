import axios from "axios";

const API = "http://localhost:8080/api/admin";

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