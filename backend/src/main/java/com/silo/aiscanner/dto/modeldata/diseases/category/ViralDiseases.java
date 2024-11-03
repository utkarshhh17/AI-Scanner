package com.silo.aiscanner.dto.modeldata.diseases.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.category.subcategory.FMD;
import com.silo.aiscanner.dto.modeldata.diseases.category.subcategory.LSD;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ViralDiseases {
    @JsonProperty(value = "fmd")
    private FMD fmd;

    @JsonProperty(value = "lsd")
    private LSD lsd;


}
