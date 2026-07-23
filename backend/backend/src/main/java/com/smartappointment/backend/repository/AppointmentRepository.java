package com.smartappointment.backend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.AppointmentStatus;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientId(Long patientId);

    long countByStatus(AppointmentStatus status);

    List<Appointment> findAllByOrderByEmergencyDescAppointmentDateAscAppointmentTimeAsc();

    List<Appointment> findByPatient_NameContainingIgnoreCase(String keyword);

    List<Appointment> findByDoctor_NameContainingIgnoreCase(String keyword);

    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByAppointmentDate(LocalDate date);

    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime
    );

    long countByDoctorId(Long doctorId);

    @Query("SELECT COALESCE(SUM(a.paymentAmount),0) FROM Appointment a WHERE a.paymentCompleted=true")
    Double getTotalRevenue();

    @Transactional
    @Modifying
    @Query("""
    DELETE FROM Appointment a
    WHERE a.doctor.id = :doctorId
""")
void deleteByDoctorId(Long doctorId);
}