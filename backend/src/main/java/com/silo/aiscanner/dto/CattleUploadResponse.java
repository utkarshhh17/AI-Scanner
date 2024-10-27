package com.silo.aiscanner.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class CattleUploadResponse {
    @JsonProperty("name")
    private String name;

    @JsonProperty("phoneNumber")
    private String phone;

    @JsonProperty("location")
    private String city;

    @JsonProperty("modelData")
    private JsonNode originalResponse;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public JsonNode getOriginalResponse() {
        return originalResponse;
    }

    public void setOriginalResponse(JsonNode originalResponse) {
        this.originalResponse = originalResponse;
    }
}
