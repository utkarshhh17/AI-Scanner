package com.silo.aiscanner.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;

@Configuration
public class SnsConfig {

    @Primary
    @Bean  // Register this method as a Spring-managed bean
    public SnsClient snsClientBuilder() {
        return SnsClient.builder()
                .region(Region.AP_SOUTH_1)
                .build();
    }

}
