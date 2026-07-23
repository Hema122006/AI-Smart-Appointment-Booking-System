package com.smartappointment.backend.service;

import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.AppointmentStatus;
import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.entity.UserRole;
import com.smartappointment.backend.repository.AppointmentRepository;
import com.smartappointment.backend.repository.DoctorRepository;
import com.smartappointment.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;
public Map<String, Object> getDashboardStatistics() {

    Map<String, Object> stats = new HashMap<>();

    stats.put("patients",
            userRepository.countByRole(UserRole.PATIENT));

    stats.put("doctors",
            doctorRepository.count());

    stats.put("appointments",
            appointmentRepository.count());

    stats.put("completed",
            appointmentRepository.countByStatus(AppointmentStatus.COMPLETED));

    stats.put("pending",
            appointmentRepository.countByStatus(AppointmentStatus.PENDING));

    stats.put("cancelled",
            appointmentRepository.countByStatus(AppointmentStatus.CANCELLED));

    stats.put("confirmed",
            appointmentRepository.countByStatus(AppointmentStatus.CONFIRMED));

    Double revenue = appointmentRepository.getTotalRevenue();

    stats.put("revenue", revenue == null ? 0 : revenue);

    return stats;
}
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    public Appointment updateAppointment(Long id, Appointment updated) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setAppointmentDate(updated.getAppointmentDate());
        appointment.setAppointmentTime(updated.getAppointmentTime());
        appointment.setStatus(updated.getStatus());

        return appointmentRepository.save(appointment);
    }
    public List<User> getAllPatients() {
        return userRepository.findByRole(UserRole.PATIENT);
    }

    public void deletePatient(Long id) {
        userRepository.deleteById(id);
}
public User updatePatient(Long id, User updatedUser) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

    user.setName(updatedUser.getName());
    user.setEmail(updatedUser.getEmail());
    user.setMobileNumber(updatedUser.getMobileNumber());

    return userRepository.save(user);
}
}