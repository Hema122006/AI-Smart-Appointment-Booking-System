package com.smartappointment.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(Customizer.withDefaults())

            .authorizeHttpRequests(auth -> auth

                // Login/Register
                .requestMatchers("/api/auth/**").permitAll()

                // Doctors
                .requestMatchers(HttpMethod.GET, "/api/doctors/**").permitAll()

                // Appointment
                .requestMatchers("/api/appointments/**").permitAll()

                // Payment
                .requestMatchers("/api/payment/**").permitAll()

                // Notification
                .requestMatchers("/api/notification/**").permitAll()

                // Everything else
                .anyRequest().permitAll()
            );

        return http.build();
    }
}