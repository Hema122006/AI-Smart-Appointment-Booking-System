import api from "./api";

export const getPatients = () => {
    return api.get("/patients");
};

export const searchPatients = (keyword: string) => {
    return api.get(`/patients/search?keyword=${keyword}`);
};

export const addPatient = (patient: any) => {
    return api.post("/patients", patient);
};

export const updatePatient = (id: number, patient: any) => {
    return api.put(`/patients/${id}`, patient);
};

export const deletePatient = (id: number) => {
    return api.delete(`/patients/${id}`);
};
