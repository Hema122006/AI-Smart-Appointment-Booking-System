import api from "./api";

export const bookAppointment = (data: any) => {
  return api.post("/appointments/book", data);
};

export const getAppointmentHistory = (patientId: number) => {
  return api.get(`/appointments/history/${patientId}`);
};

export const getPatientAppointments = (patientId: number) => {
  return api.get(`/appointments/history/${patientId}`);
};

export const payAppointment = (appointmentId: number) => {
  return api.post(`/payment/pay/${appointmentId}`);
};
export const getAppointments = () => {
  return api.get("/appointments");
};