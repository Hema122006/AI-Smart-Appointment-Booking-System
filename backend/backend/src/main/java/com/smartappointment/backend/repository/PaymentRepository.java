package com.smartappointment.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.smartappointment.backend.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByPaymentStatus(String paymentStatus);

    Optional<Payment> findByAppointmentId(Long appointmentId);

    @Modifying
    @Transactional
    @Query("""
        DELETE FROM Payment p
        WHERE p.appointment.doctor.id = :doctorId
    """)
    void deleteByDoctorId(Long doctorId);
}