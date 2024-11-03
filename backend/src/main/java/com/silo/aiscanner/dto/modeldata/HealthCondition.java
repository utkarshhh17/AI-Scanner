package com.silo.aiscanner.dto.modeldata;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.healthconditions.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HealthCondition {
    @JsonProperty(value = "animal-alertness")
    private String animalAlertness;

    @JsonProperty(value = "cleft-status")
    private Cleft cleft;

    @JsonProperty(value = "horn-status")
    private Horn horn;

    @JsonProperty(value = "rumination-status")
    private Rumination rumination;

    @JsonProperty(value = "skin-coat")
    private SkinCoat skinCoat;

    @JsonProperty(value = "teat-score")
    private TeatScore teatScore;

    @JsonProperty(value = "udder-type")
    private Udder udder;

    @JsonProperty(value = "worm-load")
    private Worm worm;

    @JsonProperty(value = "wound-status")
    private Wound wound;
}
