package com.smartappointment.backend.service;

import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class WhatsappService {

    private final String ACCOUNT_SID =
            "ACb70ba1ef405867dc9558792f01b70512";

    private final String AUTH_TOKEN =
            "1e74b6631b9bfbbf3d16963299615e10";

    private final String FROM =
            "whatsapp:+14155238886";

    public void sendWhatsApp(String mobile, String text){

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message.creator(

                new com.twilio.type.PhoneNumber(
                        "whatsapp:" + mobile),

                new com.twilio.type.PhoneNumber(FROM),

                text

        ).create();

    }

}