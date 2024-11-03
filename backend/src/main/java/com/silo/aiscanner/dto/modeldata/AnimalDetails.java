package com.silo.aiscanner.dto.modeldata;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.animaldetails.Breed;
import com.silo.aiscanner.dto.modeldata.animaldetails.BreedGrade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class AnimalDetails {

    @JsonProperty(value = "animal-type")
    private String animalType;

    @JsonProperty(value = "body-weight")
    private double bodyWeight;

    @JsonProperty(value = "breed")
    private Breed breed;

    @JsonProperty(value = "breed-grade")
    private BreedGrade breedGrade;

}
