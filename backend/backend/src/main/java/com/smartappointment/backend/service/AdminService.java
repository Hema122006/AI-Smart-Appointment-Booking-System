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

        // ========================
        // Counts
        // ========================

        stats.put("totalPatients",
        userRepository.countByRole(UserRole.PATIENT));

stats.put("totalDoctors",
        doctorRepository.count());

stats.put("totalAppointments",
        appointmentRepository.count());

stats.put("completedAppointments",
        appointmentRepository.countByStatus(AppointmentStatus.COMPLETED));

stats.put("pendingAppointments",
        appointmentRepository.countByStatus(AppointmentStatus.PENDING));

stats.put("cancelledAppointments",
        appointmentRepository.countByStatus(AppointmentStatus.CANCELLED));

stats.put("confirmedAppointments",
        appointmentRepository.countByStatus(AppointmentStatus.CONFIRMED));

stats.put("totalRevenue",
        appointmentRepository.getTotalRevenue());

        // ========================
        // Total Revenue
        // ========================

        List<Appointment> appointments = appointmentRepository.findAll();

        double revenue = appointments.stream()
                .filter(Appointment::isPaymentCompleted)
                .mapToDouble(a -> a.getDoctor().getConsultationFee())
                .sum();

        stats.put("revenue", revenue);

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