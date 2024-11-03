package com.silo.aiscanner.dto.modeldata.healthconditions;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Wound {

    @JsonProperty(value = "interpretation")
    private String interpretation;

    @JsonProperty(value = "recommendation")
    private String recommendation;

    @JsonProperty(value = "value")
    private String value;


}
