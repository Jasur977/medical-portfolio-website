package org.example.controller;

import org.example.entity.DoctorProfile;
import org.example.service.DoctorProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles")
public class DoctorProfileController {

    private final DoctorProfileService service;

    public DoctorProfileController(DoctorProfileService service) {
        this.service = service;
    }

    @GetMapping
    public List<DoctorProfile> getAllProfiles() {
        return service.getAllProfiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorProfile> getProfileById(@PathVariable UUID id) {
        return service.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DoctorProfile createProfile(@RequestBody DoctorProfile profile) {
        return service.saveProfile(profile);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DoctorProfile> updateProfile(@PathVariable UUID id, @RequestBody DoctorProfile profileDetails) {
        return service.getProfileById(id)
                .map(existingProfile -> {
                    existingProfile.setName(profileDetails.getName());
                    existingProfile.setCredentials(profileDetails.getCredentials());
                    existingProfile.setClinicLocation(profileDetails.getClinicLocation());
                    existingProfile.setContactDetails(profileDetails.getContactDetails());
                    existingProfile.setBiography(profileDetails.getBiography());
                    existingProfile.setPublications(profileDetails.getPublications());
                    existingProfile.setAppointmentBookingLink(profileDetails.getAppointmentBookingLink());
                    
                    DoctorProfile updatedProfile = service.saveProfile(existingProfile);
                    return ResponseEntity.ok(updatedProfile);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable UUID id) {
        service.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}