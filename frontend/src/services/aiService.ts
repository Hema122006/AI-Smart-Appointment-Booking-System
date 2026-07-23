import api from "./api";

export const recommendDoctor = (specialization: string) => {
  return api.get(`/ai/recommend?specialization=${specialization}`);
};