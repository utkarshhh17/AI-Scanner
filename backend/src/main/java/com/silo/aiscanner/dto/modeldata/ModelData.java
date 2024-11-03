package com.silo.aiscanner.dto.modeldata;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.SystemOfDisorder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ModelData {

    @JsonProperty(value = "animal-details")
    private AnimalDetails animalDetails;

    @JsonProperty(value = "animal-economic-status")
    private AnimalEconomicStatus animalEconomicStatus;

    @JsonProperty(value = "general-health-conditions")
    private HealthCondition healthCondition;

    @JsonProperty(value = "system-of-disorder")
    private SystemOfDisorder systemOfDisorder;
}
