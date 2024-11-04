package com.silo.aiscanner.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    @JsonProperty(value = "phoneNumber")
    private String phoneNumber;

    @JsonProperty(value = "name")
    private String name;

    @JsonProperty(value = "lang")
    private String lang;

    @JsonProperty(value = "city")
    private String place;

}
