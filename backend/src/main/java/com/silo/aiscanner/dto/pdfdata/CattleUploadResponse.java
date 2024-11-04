package com.silo.aiscanner.dto.pdfdata;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CattleUploadResponse {

    @JsonProperty(value = "farmerDetails")
    private FarmerDetails farmerDetails;

    @JsonProperty(value = "lang")
    private String lang;

    @JsonProperty("modelData")
    private JsonNode originalResponse;

}
