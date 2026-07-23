import axios from "axios";

const API = "http://localhost:8080/api/payments";

export const getPayments = () =>
    axios.get(API);

export const markPaid = (id: number) =>
    axios.put(`${API}/${id}/paid`);

export const markFailed = (id: number) =>
    axios.put(`${API}/${id}/failed`);

export const deletePayment = (id: number) =>
    axios.delete(`${API}/${id}`);