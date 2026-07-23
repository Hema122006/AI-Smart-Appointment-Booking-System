package com.smartappointment.backend.repository;

import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.entity.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMobileNumber(String mobileNumber);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByMobileNumber(String mobileNumber);

    long countByRole(UserRole role);
    List<User> findByRole(UserRole role);

    List<User> findByNameContainingIgnoreCase(String keyword);

}