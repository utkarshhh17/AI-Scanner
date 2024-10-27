package com.silo.aiscanner.repository;

import com.silo.aiscanner.entity.ModelGeneratedData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelGeneratedDataRepository extends JpaRepository<ModelGeneratedData, Long> {
    ModelGeneratedData findByUserMediaDetailsId(Long userMediaDetailsId);
}
