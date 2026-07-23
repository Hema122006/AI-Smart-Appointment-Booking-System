import api from "./api";
export interface Doctor {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  availableDays: string;
  availableTime: string;
  available: boolean;
}
export const getDoctors = () => {
  return api.get("/doctor");
};

export const addDoctor = (doctor: any) => {
  return api.post("/doctor", doctor);
};

export const updateDoctor = (id: number, doctor: any) => {
  return api.put(`/doctor/${id}`, doctor);
};

export const deleteDoctor = (id: number) => {
  return api.delete(`/doctor/${id}`);
};

export const toggleAvailability = (id: number) => {
  return api.put(`/doctor/${id}/availability`);
};