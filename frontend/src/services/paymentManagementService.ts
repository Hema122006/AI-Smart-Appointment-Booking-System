import api from "./api";

export const getPayments = () => api.get("/payments");