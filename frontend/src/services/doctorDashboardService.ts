import api from "./api";

export const getDoctorAppointments = (doctorId: number) => {
  return api.get(`/doctor/appointments/${doctorId}`);
};

export const approveAppointment = (appointmentId: number) => {
  return api.put(`/doctor/appointments/${appointmentId}/approve`);
};

export const completeAppointment = (appointmentId: number) => {
  return api.put(`/doctor/complete/${appointmentId}`);
};

export const cancelAppointment = (appointmentId: number) => {
  return api.put(`/doctor/appointments/${appointmentId}/reject`);
};