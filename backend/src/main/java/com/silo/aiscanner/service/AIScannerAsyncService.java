package com.silo.aiscanner.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.silo.aiscanner.dto.modeldata.AnimalDetails;
import com.silo.aiscanner.dto.modeldata.HealthCondition;
import com.silo.aiscanner.dto.modeldata.animaleconomicstatus.BcsScore;
import com.silo.aiscanner.dto.modeldata.animaldetails.Breed;
import com.silo.aiscanner.dto.modeldata.animaldetails.BreedGrade;
import com.silo.aiscanner.dto.modeldata.ModelData;
import com.silo.aiscanner.dto.modeldata.healthconditions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.plaf.basic.BasicViewportUI;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class AIScannerAsyncService {
    private final RestTemplate restTemplate;

    @Autowired
    private AsyncMethods asyncMethods;


    @Autowired
    public AIScannerAsyncService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    }



    public CompletableFuture<ModelData> uploadAsyncImages(MultipartFile sideImg, MultipartFile frontImg,
                                                       MultipartFile rearImg, MultipartFile video) throws IOException, ExecutionException, InterruptedException {

        String baseURL = "https://scanner.silofortune.com/api/v3";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);


        MultiValueMap<String, Object> sideImgBody = getSideImgBody(sideImg, "en");
        MultiValueMap<String, Object> frontImgBody = getFrontImgBody(frontImg, "en");
        MultiValueMap<String, Object> rearImgBody = getRearImgBody(rearImg, "en");



        CompletableFuture<BcsScore> bcsScore = asyncMethods.bcsScore(baseURL+"/bcs-score", headers, sideImgBody);
        CompletableFuture<Breed>  breedFuture = asyncMethods.breed(baseURL+"/breed-pred", headers, sideImgBody);
        CompletableFuture<BreedGrade> breedGradeFuture = breedFuture.thenCompose(breedRes ->
                asyncMethods.breedGrade(baseURL + "/breed-grade", headers, sideImgBody, breedRes.getValue())
        );

        CompletableFuture<AnimalDetails> animalDetailsFuture = breedFuture.thenCombine(breedGradeFuture, (breed, breedGrade) ->
                new AnimalDetails(null, 0, breed, breedGrade));

        CompletableFuture<Cleft> cleftFuture = asyncMethods.cleft(baseURL + "/cleft-status", headers, rearImgBody);
        CompletableFuture<Horn> hornFuture = asyncMethods.horn(baseURL + "/horn-pred", headers, frontImgBody);
        CompletableFuture<SkinCoat> skinCoatFuture = asyncMethods.skinCoat(baseURL + "/skin-coat-pred", headers, sideImgBody);
        CompletableFuture<TeatScore> teatScoreFuture = asyncMethods.teat(baseURL + "/teat-score", headers, sideImgBody);
        CompletableFuture<Udder> udderFuture = asyncMethods.udder(baseURL + "/udder-pred", headers, sideImgBody);
        CompletableFuture<Worm> wormFuture = asyncMethods.worm(baseURL + "/worm-pred", headers, sideImgBody);
        CompletableFuture<Wound> woundFuture = asyncMethods.wound(baseURL + "/wound-status", headers, sideImgBody);


        CompletableFuture<HealthCondition> healthConditionFuture = CompletableFuture.allOf(cleftFuture, hornFuture, skinCoatFuture,
                teatScoreFuture, udderFuture, wormFuture, woundFuture)
                .thenApply(v -> {
                    try {
                        // Get results from each future
                        Cleft cleft = cleftFuture.get();
                        Horn horn = hornFuture.get();
                        SkinCoat skinCoat = skinCoatFuture.get();
                        TeatScore teatScore = teatScoreFuture.get();
                        Udder udder = udderFuture.get();
                        Worm worm = wormFuture.get();
                        Wound wound = woundFuture.get();

                        // Create HealthCondition object
                        return new HealthCondition(null, cleft, horn,null,  skinCoat, teatScore, udder, worm, wound);
                    } catch (InterruptedException | ExecutionException e) {
                        throw new RuntimeException("Error retrieving health conditions", e);
                    }
        });





//        ModelData modelData = new ModelData();
////        modelData.setBcsScore(bcsScore);
////        modelData.setBreed(breed);
////        modelData.setBreedGrade(breedGrade);
//        modelData.setHealthCondition(new HealthCondition(null, cleft, horn, null, skinCoat, teatScore, udder, worm, wound ));
//        return modelData;





        return CompletableFuture.allOf(animalDetailsFuture, healthConditionFuture)
                .thenApply(v -> {
                    ModelData modelData = new ModelData();
                    try {
                        modelData.setAnimalDetails(animalDetailsFuture.get());
                        modelData.setHealthCondition(healthConditionFuture.get());
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    } catch (ExecutionException e) {
                        throw new RuntimeException(e);
                    }
                    return modelData;
                });
    }






















    public MultiValueMap<String, Object> getSideImgBody(MultipartFile sideImg, String language) throws IOException {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("side-img", new org.springframework.core.io.ByteArrayResource(sideImg.getBytes()) {
            @Override
            public String getFilename() {
                return sideImg.getOriginalFilename();
            }
        });
        body.add("language", language);
        return body;

    }

    public MultiValueMap<String, Object> getFrontImgBody(MultipartFile frontImg, String language) throws IOException {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("front-img", new org.springframework.core.io.ByteArrayResource(frontImg.getBytes()) {
            @Override
            public String getFilename() {
                return frontImg.getOriginalFilename();
            }
        });
        body.add("language", language);
        return body;

    }
    public MultiValueMap<String, Object> getRearImgBody(MultipartFile rearImg, String language) throws IOException {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("rear-img", new org.springframework.core.io.ByteArrayResource(rearImg.getBytes()) {
            @Override
            public String getFilename() {
                return rearImg.getOriginalFilename();
            }
        });
        body.add("language", language);
        return body;

    }
}
