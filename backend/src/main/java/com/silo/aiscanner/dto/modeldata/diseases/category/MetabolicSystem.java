package com.silo.aiscanner.dto.modeldata.diseases.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.category.subcategory.MilkFeverPrediction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MetabolicSystem {
    @JsonProperty(value = "milk-fever")
    private MilkFeverPrediction milkFeverPrediction;
}
