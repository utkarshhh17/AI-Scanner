package com.silo.aiscanner.dto.modeldata.diseases.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.category.subcategory.FleaBitePrediction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SkinSensoryOrgans {
    @JsonProperty(value = "flea-bite")
    private FleaBitePrediction fleaBitePrediction;
}
