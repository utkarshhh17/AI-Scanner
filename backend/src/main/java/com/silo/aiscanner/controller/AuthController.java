package com.silo.aiscanner.controller;

import com.silo.aiscanner.dto.RegisterDTO;
import com.silo.aiscanner.dto.VerifyDTO;
import com.silo.aiscanner.entity.User;
import com.silo.aiscanner.repository.UserRepository;
import com.silo.aiscanner.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Enable CORS for all requests to this API endpoint
public class AuthController {

    @Autowired
    private OtpService otpService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody String phoneNumber) {
        // This method is called when user enters phone number
        User user = userRepository.findByPhoneNumber(phoneNumber);

        // if phone number does not exist, return 404
        // prompt the user to signup page
        if (user == null) {
            return new ResponseEntity<>("This number is not registered", HttpStatus.NOT_FOUND);
        }

        // if phone number exists, send otp to the number
        // prompt the user to login page
        String otp = otpService.generateOTP();
        phoneNumber = "+"+phoneNumber;
        otpService.sendOTP("Your OTP for Silo Fortune is: ", phoneNumber);
        user.setOtp(otp);
        user.setVerified(false);

        userRepository.save(user);
        return new ResponseEntity<>(user.getSession(), HttpStatus.OK);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyDTO verifyDTO) {
        // This method is called when user enters otp
        // session id is return , prompt the user to home page
        User user = userRepository.findByPhoneNumber(verifyDTO.getPhoneNumber());

        if(user.isVerified()==true){
            return new ResponseEntity<>("Already Verified", HttpStatus.BAD_REQUEST);
        }


        if (user != null && user.getOtp().equals(verifyDTO.getOtp())) {
            user.setVerified(true);
            user.setUpdatedAt(LocalDateTime.now());
            String sessionId = user.getSession()==null ? UUID.randomUUID().toString() : user.getSession();
            user.setSession(sessionId);
            userRepository.save(user);
            return new ResponseEntity<>(sessionId, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Something was wrong", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO){
        // This method is called when the phone number does not exist in the database
        User user = userRepository.findByPhoneNumber(registerDTO.getPhoneNumber());

        // if number already exists, display the number already exists
        if(user!=null) return new ResponseEntity<>("User Exists with this number", HttpStatus.BAD_REQUEST);

        System.out.println(registerDTO.getPlace());

        // if number does not exist, create a new user
        // then prompt the user to the otp page
        user = new User();
        user.setName(registerDTO.getName());
        user.setPhoneNumber(registerDTO.getPhoneNumber());
        user.setLang(registerDTO.getLang());
        user.setCity(registerDTO.getPlace());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        String otp = otpService.generateOTP();
        String phoneNumber = "+"+registerDTO.getPhoneNumber();
        System.out.println(phoneNumber);
        otpService.sendOTP("Your OTP for Silo Fortune is: "+otp, phoneNumber);
        user.setOtp(otp);
        user.setVerified(false);
        userRepository.save(user);
        return new ResponseEntity<>("User Created, but not verified", HttpStatus.CREATED);
    }
}
