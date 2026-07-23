import api from "./api";

export const sendNotification = (data: any) => {
  return api.post("/notification/send", data);
};