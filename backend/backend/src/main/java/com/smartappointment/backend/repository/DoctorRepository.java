package com.smartappointment.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartappointment.backend.entity.Doctor;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findBySpecialization(String specialization);

    List<Doctor> findByNameContainingIgnoreCase(String name);

    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);

    Optional<Doctor> findByMobileNumber(String mobileNumber);

}