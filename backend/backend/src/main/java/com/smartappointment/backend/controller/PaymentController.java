package com.smartappointment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartappointment.backend.entity.Payment;
import com.smartappointment.backend.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://ai-smart-appointment-booking-system.vercel.app"
})
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<Payment> getPayments() {
        return paymentService.getAllPayments();
    }

    @PutMapping("/{id}/paid")
    public Payment markPaid(@PathVariable Long id) {
        return paymentService.markAsPaid(id);
    }

    @PutMapping("/{id}/failed")
    public Payment markFailed(@PathVariable Long id) {
        return paymentService.markAsFailed(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }

}