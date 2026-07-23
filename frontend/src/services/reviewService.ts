import api from "./api";

export const addReview = (review: any) =>
  api.post("/reviews", review);

export const getDoctorRating = (doctorId: number) =>
  api.get(`/reviews/doctor/${doctorId}`);
export const getDoctorReviews = (doctorId: number) =>
  api.get(`/reviews/doctor/${doctorId}`);

export const getAverageRating = (doctorId: number) =>
  api.get(`/reviews/doctor/${doctorId}/rating`);