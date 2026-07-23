package com.smartappointment.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.AppointmentStatus;
import com.smartappointment.backend.entity.Doctor;
import com.smartappointment.backend.repository.AppointmentRepository;
import com.smartappointment.backend.repository.DoctorRepository;
import com.smartappointment.backend.entity.User;
import com.smartappointment.backend.entity.UserRole;
import com.smartappointment.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import com.smartappointment.backend.repository.PaymentRepository;

@Service

public class DoctorService {
     
     @Autowired
private PaymentRepository paymentRepository;

    @Autowired
private UserRepository userRepository;

@Autowired
private PasswordEncoder passwordEncoder;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // ===========================================
    // Doctor Dashboard
    // ===========================================

    
    public List<Appointment> getAppointments(Long doctorId) {

    List<Appointment> list = appointmentRepository.findByDoctorId(doctorId);

    System.out.println("================================");
    System.out.println("Doctor ID : " + doctorId);
    System.out.println("Appointments Count : " + list.size());

    if (!list.isEmpty()) {
        System.out.println("Appointment ID : " + list.get(0).getId());
        System.out.println("Patient : " + list.get(0).getPatient().getName());
        System.out.println("Doctor : " + list.get(0).getDoctor().getName());
    }

    System.out.println("================================");

    return list;
}
    // Doctor approves appointment

public Appointment completeAppointment(Long appointmentId) {

    Appointment appointment = appointmentRepository
            .findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appointment.setStatus(AppointmentStatus.COMPLETED);

    return appointmentRepository.save(appointment);
}

    public Appointment confirmAppointment(Long appointmentId) {

    Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    appointment.setStatus(AppointmentStatus.CONFIRMED);

    return appointmentRepository.save(appointment);
}
    // Doctor rejects appointment
    public Appointment cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.CANCELLED);

        return appointmentRepository.save(appointment);
    }

    // ===========================================
    // Admin - Doctor Management
    // ===========================================

    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor addDoctor(Doctor doctor) {

    Doctor savedDoctor = doctorRepository.save(doctor);

    User user = new User();

    user.setName(savedDoctor.getName());
    user.setEmail(savedDoctor.getEmail());
    user.setMobileNumber(savedDoctor.getMobileNumber());

    user.setPassword(
            passwordEncoder.encode(savedDoctor.getPassword())
    );

    user.setRole(UserRole.DOCTOR);

    user.setFirstTimePatient(false);

    userRepository.save(user);

    return savedDoctor;
}

    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        existingDoctor.setName(doctor.getName());
        existingDoctor.setEmail(doctor.getEmail());
        existingDoctor.setPassword(doctor.getPassword());
        existingDoctor.setMobileNumber(doctor.getMobileNumber());
        existingDoctor.setSpecialization(doctor.getSpecialization());
        existingDoctor.setQualification(doctor.getQualification());
        existingDoctor.setExperience(doctor.getExperience());
        existingDoctor.setConsultationFee(doctor.getConsultationFee());
        existingDoctor.setAvailableDays(doctor.getAvailableDays());
        existingDoctor.setAvailableTime(doctor.getAvailableTime());
        existingDoctor.setAvailable(doctor.isAvailable());

        return doctorRepository.save(existingDoctor);
    }
    

@Transactional
public void deleteDoctor(Long id) {

    Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

    // 1. Delete payments
    paymentRepository.deleteByDoctorId(id);

    // 2. Delete appointments
    appointmentRepository.deleteByDoctorId(id);

    // 3. Delete login account
    userRepository.findByMobileNumber(doctor.getMobileNumber())
            .ifPresent(userRepository::delete);

    // 4. Delete doctor
    doctorRepository.delete(doctor);
}

    public Doctor getDoctorById(Long id) {

        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

    }

    public Doctor toggleAvailability(Long id) {

    Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

    doctor.setAvailable(!doctor.isAvailable());

    return doctorRepository.save(doctor);
}

}