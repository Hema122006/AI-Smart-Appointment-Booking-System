package com.smartappointment.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartappointment.backend.entity.Payment;
import com.smartappointment.backend.repository.PaymentRepository;
import com.smartappointment.backend.entity.Appointment;
import com.smartappointment.backend.entity.AppointmentStatus;
import com.smartappointment.backend.repository.AppointmentRepository;

@Service
public class PaymentService {
    @Autowired
private AppointmentRepository appointmentRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment markAsPaid(Long appointmentId) {

    System.out.println("Appointment ID = " + appointmentId);

    Payment payment = paymentRepository.findByAppointmentId(appointmentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

    System.out.println("Payment Found = " + payment.getId());

    Appointment appointment = payment.getAppointment();

    System.out.println("Appointment = " + appointment.getId());

    payment.setPaymentStatus("PAID");

    appointment.setPaymentCompleted(true);

    appointmentRepository.save(appointment);

    paymentRepository.save(payment);

    System.out.println("Updated Successfully");

    return payment;
}

public Payment markAsFailed(Long appointmentId) {

    Payment payment = paymentRepository.findByAppointmentId(appointmentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

    payment.setPaymentStatus("FAILED");

    return paymentRepository.save(payment);
}

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

}