package com.silo.aiscanner.dto.modeldata.diseases.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.category.subcategory.DiarrheaPrediction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DigestiveSystem {
    @JsonProperty(value = "diarrhea")
    private DiarrheaPrediction diarrheaPrediction;
}
