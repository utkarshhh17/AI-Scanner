package com.silo.aiscanner.dto.modeldata.animaleconomicstatus;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcsScore {

    @JsonProperty(value = "interpretation")
    private String interpretation;

    @JsonProperty(value = "recommendation")
    private String recommendation;

    @JsonProperty(value = "value")
    private double value;


}
