package com.smartappointment.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartappointment.backend.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByDoctorId(Long doctorId);

}