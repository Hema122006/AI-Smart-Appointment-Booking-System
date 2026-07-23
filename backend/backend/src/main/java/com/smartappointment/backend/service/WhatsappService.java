package com.smartappointment.backend.service;

import org.springframework.stereotype.Service;

@Service
public class WhatsappService {

    public void sendWhatsApp(String phoneNumber, String message) {

        System.out.println("WhatsApp Message");
        System.out.println("To : " + phoneNumber);
        System.out.println(message);

    }

}