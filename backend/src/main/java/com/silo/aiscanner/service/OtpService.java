package com.silo.aiscanner.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;
import software.amazon.awssdk.services.sns.model.SnsException;
import java.security.SecureRandom;


@Service
public class OtpService {

    private static final String CHARACTERS = "0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    private SnsClient snsClient;

    @Autowired
    public OtpService(SnsClient snsClient) {
        this.snsClient = snsClient;
    }

    public void sendOTP(String message, String phoneNumber) {
        System.out.println("Sending OTP: "+phoneNumber);
        try {
            PublishRequest request = PublishRequest.builder()
                    .message(message)
                    .phoneNumber(phoneNumber)
                    .build();

            PublishResponse result = snsClient.publish(request);
            System.out
                    .println(result.messageId() + " Message sent. Status was " + result.sdkHttpResponse().statusCode());

        } catch (SnsException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
    }


    public String generateOTP() {
        StringBuilder otp = new StringBuilder(4);
        for (int i = 0; i < 4; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            otp.append(CHARACTERS.charAt(index));
        }

        return otp.toString();
    }
}
