import api from "./api";

export const getAppointments = () =>
    api.get("/appointment-management");

export const deleteAppointment = (id: number) =>
    api.delete(`/appointment-management/${id}`);

export const updateAppointment = (id: number, appointment: any) =>
    api.put(`/appointment-management/${id}`, appointment);