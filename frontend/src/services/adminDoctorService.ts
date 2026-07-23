import api from "./api";

export const getDoctors = () => {
  return api.get("/admin/doctors");
};

export const addDoctor = (doctor: any) => {
  return api.post("/admin/doctors", doctor);
};

export const updateDoctor = (id: number, doctor: any) => {
  return api.put(`/admin/doctors/${id}`, doctor);
};

export const deleteDoctor = (id: number) => {
  return api.delete(`/admin/doctors/${id}`);
};

export const searchDoctor = (name: string) => {
  return api.get(`/admin/doctors/search?name=${name}`);
};