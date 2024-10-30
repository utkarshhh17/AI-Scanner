package com.silo.aiscanner.controller;

import com.silo.aiscanner.entity.MediaDetails;
import com.silo.aiscanner.entity.User;
import com.silo.aiscanner.repository.MediaDetailsRepository;
import com.silo.aiscanner.repository.UserRepository;
import com.silo.aiscanner.service.AIScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Enable CORS for all requests to this API endpoint
public class AIScannerController {

    @Autowired
    private AIScannerService aiScannerService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MediaDetailsRepository mediaDetailsRepository;

    @GetMapping("/test")
    public String test(){
        return "Hello world";
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam(value = "side") MultipartFile sideImg,
            @RequestParam(value = "front") MultipartFile frontImg,
            @RequestParam(value = "rear") MultipartFile rearImg,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestHeader("Session-ID") String sessionId) throws IOException {

        String videoName = null;

        if(video!=null){
            videoName = video.getOriginalFilename();
        }


        User user = userRepository.findBySession(sessionId);


        // upload the images and videos to s3, get the url and then store it in the database



        // image path done
//        MediaFilesName mediaFilesName = new MediaFilesName();
//        mediaFilesName.setSideImageName(sideImg.getOriginalFilename());
//        mediaFilesName.setFrontImageName(frontImg.getOriginalFilename());
//        mediaFilesName.setRearImageName(rearImg.getOriginalFilename());



        MediaDetails mediaDetails = new MediaDetails();
        mediaDetails.setUserId(user.getUserId());
        mediaDetails.setVideoFile(videoName);
        mediaDetails.setImageFile("Images");
        mediaDetails.setImageS3Path("Image S3 path");
        mediaDetails.setVideoS3Path("Video S3 path");
        mediaDetails.setCreatedAt(LocalDateTime.now());
        mediaDetails.setUpdatedAt(LocalDateTime.now());
        MediaDetails a = mediaDetailsRepository.save(mediaDetails);




//
        if(user==null){
            return new ResponseEntity<>("Session ID is wrong", HttpStatus.BAD_REQUEST);
        }

        ResponseEntity<byte[]> responseEntity = aiScannerService.uploadCattleImages(sideImg, frontImg, rearImg, video, user, a);

        if (responseEntity.getBody() != null) {
            System.out.println("PDF received with length: " + responseEntity.getBody().length);
        } else {
            System.out.println("No PDF received.");
        }

        return responseEntity;



    }
}
