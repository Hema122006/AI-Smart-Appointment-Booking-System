package com.smartappointment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.dto.DashboardDTO;
import com.smartappointment.backend.repository.AppointmentRepository;
import com.smartappointment.backend.repository.DoctorRepository;
import com.smartappointment.backend.repository.UserRepository;
import com.smartappointment.backend.entity.UserRole;

@Service
public class DashboardService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

   public DashboardDTO getDashboard() {

    long doctors = doctorRepository.count();
    long patients = userRepository.countByRole(UserRole.PATIENT);
    long appointments = appointmentRepository.count();

    long confirmed =
            appointmentRepository.findAll()
                    .stream()
                    .filter(a -> a.getStatus().name().equals("CONFIRMED"))
                    .count();

    long pending =
            appointmentRepository.findAll()
                    .stream()
                    .filter(a -> a.getStatus().name().equals("PENDING"))
                    .count();

    long completed =
            appointmentRepository.findAll()
                    .stream()
                    .filter(a -> a.getStatus().name().equals("COMPLETED"))
                    .count();

    long cancelled =
            appointmentRepository.findAll()
                    .stream()
                    .filter(a -> a.getStatus().name().equals("CANCELLED"))
                    .count();

    double revenue =
            appointmentRepository.findAll()
                    .stream()
                    .filter(a -> a.isPaymentCompleted())
                    .mapToDouble(a -> a.getPaymentAmount())
                    .sum();

    return new DashboardDTO(
            doctors,
            patients,
            appointments,
            confirmed,
            pending,
            completed,
            cancelled,
            revenue
    );
}
}