package com.silo.aiscanner.dto.modeldata.diseases.category.subcategory;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MastitisPrediction {

    @JsonProperty(value = "interpretation")
    private String interpretation;

    @JsonProperty(value = "recommendation")
    private String recommendation;

    @JsonProperty(value = "value")
    private double value;


}
