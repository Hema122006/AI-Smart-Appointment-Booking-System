package com.smartappointment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.repository.UserRepository;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    public User getProfile(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setMobileNumber(updatedUser.getMobileNumber());

        if (updatedUser.getPassword() != null &&
            !updatedUser.getPassword().isBlank()) {

            user.setPassword(updatedUser.getPassword());
        }

        return userRepository.save(user);
    }
}