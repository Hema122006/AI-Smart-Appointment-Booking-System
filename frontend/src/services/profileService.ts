import api from "./api";

export const getProfile = (id: number) => {
  return api.get(`/profile/${id}`);
};

export const updateProfile = (id: number, data: any) => {
  return api.put(`/profile/${id}`, data);
};