package com.smartappointment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.dto.LoginRequest;
import com.smartappointment.backend.dto.LoginResponse;
import com.smartappointment.backend.dto.RegisterRequest;
import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.entity.UserRole;
import com.smartappointment.backend.repository.UserRepository;
import com.smartappointment.backend.repository.DoctorRepository;
import com.smartappointment.backend.entity.Doctor;

@Service
public class AuthService {

    @Autowired
private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ==========================
    // REGISTER
    // ==========================

    public String register(RegisterRequest request) {

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return "Mobile Number already exists";
        }

        if (request.getEmail() != null &&
                !request.getEmail().isBlank() &&
                userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        if (request.getRole() == null || request.getRole().isBlank()) {
            user.setRole(UserRole.PATIENT);
        } else {
            user.setRole(UserRole.valueOf(request.getRole().toUpperCase()));
        }

        user.setFirstTimePatient(true);

        userRepository.save(user);

        return "Registration Successful";
    }

    // ==========================
    // LOGIN
    // ==========================

    public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByMobileNumber(request.getMobileNumber())
            .orElseThrow(() -> new RuntimeException("Mobile Number not registered"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid Password");
    }

    Long loginId = user.getId();

    if (user.getRole() == UserRole.DOCTOR) {

        Doctor doctor = doctorRepository
                .findByMobileNumber(user.getMobileNumber())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        loginId = doctor.getId();
    }

    return new LoginResponse(
            "TEMP_TOKEN",
            user.getRole().name(),
            "Login Successful",
            user.isFirstTimePatient(),
            loginId,
            user.getName()
    );
}
    
    public String changePassword(LoginRequest request) {

    User user = userRepository.findByMobileNumber(request.getMobileNumber())
            .orElseThrow(() -> new RuntimeException("Mobile Number not found"));

    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user);

    return "Password Changed Successfully";
}

}