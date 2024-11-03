package com.silo.aiscanner.service;

import com.silo.aiscanner.dto.modeldata.animaldetails.Breed;
import com.silo.aiscanner.dto.modeldata.animaldetails.BreedGrade;
import com.silo.aiscanner.dto.modeldata.animaleconomicstatus.BcsScore;
import com.silo.aiscanner.dto.modeldata.healthconditions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.concurrent.CompletableFuture;

@Service
public class AsyncMethods {

    private final RestTemplate restTemplate;


    @Autowired
    public AsyncMethods(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    }
    @Async
    public CompletableFuture<BcsScore> bcsScore(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        BcsScore res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, BcsScore.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Breed> breed(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Breed res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Breed.class).getBody();
        return CompletableFuture.completedFuture(res);
    }


    @Async
    public CompletableFuture<BreedGrade> breedGrade(String url, HttpHeaders headers, MultiValueMap<String, Object> body, String breedValue) {
        body.add("breed", breedValue);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        BreedGrade res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, BreedGrade.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Cleft> cleft(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Cleft res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Cleft.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Horn> horn(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Horn res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Horn.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Udder> udder(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Udder res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Udder.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Wound> wound(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Wound res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Wound.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<TeatScore> teat(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        TeatScore res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, TeatScore.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<SkinCoat> skinCoat(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        SkinCoat res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, SkinCoat.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Worm> worm(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Worm res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Worm.class).getBody();
        return CompletableFuture.completedFuture(res);
    }

    @Async
    public CompletableFuture<Rumination> rumination(String url, HttpHeaders headers, MultiValueMap<String, Object> body) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        Rumination res = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Rumination.class).getBody();
        return CompletableFuture.completedFuture(res);
    }
}
