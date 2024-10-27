package com.silo.aiscanner.controller;

import com.silo.aiscanner.entity.User;
import com.silo.aiscanner.repository.UserRepository;
import com.silo.aiscanner.service.AIScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Enable CORS for all requests to this API endpoint
public class AIScannerController {

    @Autowired
    private AIScannerService aiScannerService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/test")
    public String test(){
        return "Hello world";
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam(value = "side-img") MultipartFile sideImg,
            @RequestParam(value = "front-img") MultipartFile frontImg,
            @RequestParam(value = "rear-img") MultipartFile rearImg,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestHeader("Session-ID") String sessionId) throws IOException {




        User user = userRepository.findBySession(sessionId);

        if(user==null){
            return new ResponseEntity<>("Session ID is wrong", HttpStatus.BAD_REQUEST);
        }

        // Call the service method to upload images and get the PDF response
        ResponseEntity<byte[]> responseEntity = aiScannerService.uploadCattleImages(sideImg, frontImg, rearImg, video, user);

        // Log the response if needed
        if (responseEntity.getBody() != null) {
            System.out.println("PDF received with length: " + responseEntity.getBody().length);
        } else {
            System.out.println("No PDF received.");
        }

        // Return the ResponseEntity directly
        return responseEntity;

    }
}
