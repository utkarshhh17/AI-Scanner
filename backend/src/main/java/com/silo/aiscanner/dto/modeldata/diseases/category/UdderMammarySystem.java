package com.silo.aiscanner.dto.modeldata.diseases.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silo.aiscanner.dto.modeldata.diseases.category.subcategory.MastitisPrediction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UdderMammarySystem {
    @JsonProperty(value = "mastitis")
    private MastitisPrediction mastitisPrediction;
}
