package org.example.service;

import org.example.entity.DoctorProfile;
import org.example.repository.DoctorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorProfileService {

    private final DoctorProfileRepository repository;

    public DoctorProfileService(DoctorProfileRepository repository) {
        this.repository = repository;
    }

    public List<DoctorProfile> getAllProfiles() {
        return repository.findAll();
    }

    public Optional<DoctorProfile> getProfileById(UUID id) {
        return repository.findById(id);
    }

    public DoctorProfile saveProfile(DoctorProfile profile) {
        return repository.save(profile);
    }

    public void deleteProfile(UUID id) {
        repository.deleteById(id);
    }
}