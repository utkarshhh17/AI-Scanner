package com.silo.aiscanner.controller;

import com.silo.aiscanner.service.AIScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class AIScannerController {

    @Autowired
    private AIScannerService aiScannerService;

    @GetMapping("/test")
    public String test(){
        return "Hello world";
    }

    @PostMapping("/upload")
    public ResponseEntity<byte[]> upload(
            @RequestParam(value = "side-img") MultipartFile sideImg,
            @RequestParam(value = "front-img") MultipartFile frontImg,
            @RequestParam(value = "rear-img") MultipartFile rearImg,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam(value = "language") String lang) throws IOException {

        // Call the service method to upload images and get the PDF response
        ResponseEntity<byte[]> responseEntity = aiScannerService.uploadCattleImages(sideImg, frontImg, rearImg, video, lang);

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
