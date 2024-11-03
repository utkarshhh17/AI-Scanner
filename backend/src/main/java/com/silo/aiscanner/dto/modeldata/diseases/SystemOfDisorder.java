package com.silo.aiscanner.dto.modeldata.diseases;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.category.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SystemOfDisorder {
    @JsonProperty(value = "digestive-system")
    private DigestiveSystem digestiveSystem;

    @JsonProperty(value = "metabolic-system")
    private MetabolicSystem metabolicSystem;

    @JsonProperty(value = "skin-Sensory-organs")
    private SkinSensoryOrgans skinSensoryOrgans;

    @JsonProperty(value = "udder-mammary-system")
    private UdderMammarySystem udderMammarySystem;

    @JsonProperty(value = "viral-diseases")
    private ViralDiseases viralDiseases;
}
