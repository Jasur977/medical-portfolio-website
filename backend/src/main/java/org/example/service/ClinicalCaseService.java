package org.example.service;

import org.example.entity.ClinicalCase;
import org.example.repository.ClinicalCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClinicalCaseService {

    private final ClinicalCaseRepository repository;

    public ClinicalCaseService(ClinicalCaseRepository repository) {
        this.repository = repository;
    }

    public List<ClinicalCase> getAllCases() {
        return repository.findAll();
    }

    public Optional<ClinicalCase> getCaseById(UUID id) {
        return repository.findById(id);
    }

    public ClinicalCase saveCase(ClinicalCase clinicalCase) {
        return repository.save(clinicalCase);
    }

    public void deleteCase(UUID id) {
        repository.deleteById(id);
    }

    public List<ClinicalCase> searchCases(String query) {
        return repository.findByTitleContainingIgnoreCase(query);
    }
}