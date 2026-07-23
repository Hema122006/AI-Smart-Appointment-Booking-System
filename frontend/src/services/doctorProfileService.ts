import api from "./api";

export const getDoctorProfile = (id: number) => {
  return api.get(`/doctor/profile/${id}`);
};

export const updateDoctorProfile = (id: number, doctor: any) => {
  return api.put(`/doctor/profile/${id}`, doctor);
};