package com.silo.aiscanner.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class AIScannerService {

    private final RestTemplate restTemplate;

    @Autowired
    public AIScannerService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<byte[]> uploadCattleImages(MultipartFile sideImg, MultipartFile frontImg,
                                     MultipartFile rearImg, MultipartFile video,
                                     String lang) throws IOException {

        String url = "https://scanner.silofortune.com/api/v2/cattle-scanner";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Prepare the body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("side-img", new org.springframework.core.io.ByteArrayResource(sideImg.getBytes()) {
            @Override
            public String getFilename() {
                return sideImg.getOriginalFilename();
            }
        });
        body.add("front-img", new org.springframework.core.io.ByteArrayResource(frontImg.getBytes()) {
            @Override
            public String getFilename() {
                return frontImg.getOriginalFilename();
            }
        });
        body.add("rear-img", new org.springframework.core.io.ByteArrayResource(rearImg.getBytes()) {
            @Override
            public String getFilename() {
                return rearImg.getOriginalFilename();
            }
        });
        if (video != null) {
            body.add("video", new org.springframework.core.io.ByteArrayResource(video.getBytes()) {
                @Override
                public String getFilename() {
                    return video.getOriginalFilename();
                }
            });
        }
        body.add("lang", lang);


        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // response is getting within 5 seconds
        String response =  restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class).getBody();
        return sendJsonToApiAndGetPdf(response);
    }

    public ResponseEntity<byte[]> sendJsonToApiAndGetPdf(String json) {
        String apiUrl = "http://localhost:8000/api";

        // Prepare headers for JSON request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);

        // Make the request and receive the PDF response
        byte[] pdfBytes = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, byte[].class).getBody();

        if (pdfBytes == null || pdfBytes.length == 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // Or handle as needed
        }

        HttpHeaders pdfHeaders = new HttpHeaders();
        pdfHeaders.setContentType(MediaType.APPLICATION_PDF);
        pdfHeaders.setContentDispositionFormData("attachment", "response.pdf");
        pdfHeaders.setContentLength(pdfBytes.length);

        return new ResponseEntity<>(pdfBytes, pdfHeaders, HttpStatus.OK);
    }





}