package com.smartappointment.backend.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService {

    public void sendSMS(String phoneNumber, String message) {
        System.out.println("SMS Sent to " + phoneNumber);
        System.out.println(message);
    }

    public void sendWhatsApp(String phoneNumber, String message) {
        System.out.println("WhatsApp Notification Sent to " + phoneNumber);
        System.out.println(message);
    }
}