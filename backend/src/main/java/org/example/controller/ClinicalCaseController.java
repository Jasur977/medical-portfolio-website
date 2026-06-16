package org.example.controller;

import org.example.entity.ClinicalCase;
import org.example.service.ClinicalCaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cases")
public class ClinicalCaseController {

    private final ClinicalCaseService service;

    public ClinicalCaseController(ClinicalCaseService service) {
        this.service = service;
    }

    @GetMapping
    public List<ClinicalCase> getAllCases() {
        return service.getAllCases();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicalCase> getCaseById(@PathVariable UUID id) {
        return service.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ClinicalCase createCase(@RequestBody ClinicalCase clinicalCase) {
        return service.saveCase(clinicalCase);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ClinicalCase> updateCase(@PathVariable UUID id, @RequestBody ClinicalCase caseDetails) {
        return service.getCaseById(id)
                .map(existingCase -> {
                    existingCase.setTitle(caseDetails.getTitle());
                    existingCase.setCategory(caseDetails.getCategory());
                    existingCase.setPresentation(caseDetails.getPresentation());
                    existingCase.setLabResults(caseDetails.getLabResults());
                    existingCase.setManagement(caseDetails.getManagement());
                    existingCase.setIsPublished(caseDetails.getIsPublished());
                    if (caseDetails.getImageUrl() != null) {
                        existingCase.setImageUrl(caseDetails.getImageUrl());
                    }
                    ClinicalCase updatedCase = service.saveCase(existingCase);
                    return ResponseEntity.ok(updatedCase);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable UUID id) {
        service.deleteCase(id);
        return ResponseEntity.noContent().build();
    }
}
