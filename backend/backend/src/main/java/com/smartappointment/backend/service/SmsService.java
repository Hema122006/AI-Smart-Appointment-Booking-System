package com.smartappointment.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromNumber;

    // Twilio Sandbox WhatsApp Number
    private final String whatsappNumber = "whatsapp:+14155238886";

    private void initializeTwilio() {
        Twilio.init(accountSid, authToken);
    }

    // SMS
    public void sendSMS(String to, String message) {

        initializeTwilio();

        Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(fromNumber),
                message
        ).create();

        System.out.println("SMS Sent Successfully");
    }

    // WhatsApp
    public void sendWhatsApp(String to, String message) {

        initializeTwilio();

        Message.creator(
                new PhoneNumber("whatsapp:" + to),
                new PhoneNumber(whatsappNumber),
                message
        ).create();

        System.out.println("WhatsApp Sent Successfully");
    }
}