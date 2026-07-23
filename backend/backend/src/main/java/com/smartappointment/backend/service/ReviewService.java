package com.smartappointment.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.entity.Review;
import com.smartappointment.backend.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getDoctorReviews(Long doctorId) {
        return reviewRepository.findByDoctorId(doctorId);
    }

    public Double getAverageRating(Long doctorId) {

        List<Review> reviews =
                reviewRepository.findByDoctorId(doctorId);

        if (reviews.isEmpty()) {
            return 0.0;
        }

        double total = 0;

        for (Review r : reviews) {
            total += r.getRating();
        }

        return total / reviews.size();
    }
}