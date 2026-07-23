package com.smartappointment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.entity.Review;
import com.smartappointment.backend.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Add Review
    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    // Reviews of one doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Review> getDoctorReviews(@PathVariable Long doctorId) {
        return reviewService.getDoctorReviews(doctorId);
    }

    // Average Rating
    @GetMapping("/doctor/{doctorId}/rating")
    public Double getAverageRating(@PathVariable Long doctorId) {
        return reviewService.getAverageRating(doctorId);
    }
}