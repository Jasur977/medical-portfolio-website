package org.example.repository;

import org.example.entity.ClinicalCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClinicalCaseRepository extends JpaRepository<ClinicalCase, UUID> {
}
