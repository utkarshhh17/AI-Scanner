package com.silo.aiscanner.dto.modeldata;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.animaleconomicstatus.BcsScore;

public class AnimalEconomicStatus {

    @JsonProperty(value = "bcs")
    private BcsScore bcsScore;

    @JsonProperty(value = "breeding-capacity")
    private String breedingCapacity;

    @JsonProperty(value = "buying-recommendation")
    private String buyingRecommendation;

    @JsonProperty(value = "lactation-yield")
    private String lactationYield;

    @JsonProperty(value = "market-value")
    private String marketValue;

    @JsonProperty(value = "milk yield")
    private String milkYield;

    @JsonProperty(value = "production-capacity")
    private String productionCapacity;
}
