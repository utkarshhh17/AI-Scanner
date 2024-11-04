package com.silo.aiscanner.dto.pdfdata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FarmerDetails {
    @JsonProperty("name")
    private String name;

    @JsonProperty("phoneNumber")
    private String phone;

    @JsonProperty("place")
    private String city;
}
