package org.example.service;

import org.example.entity.Lesson;
import org.example.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LessonService {

    private final LessonRepository repository;

    public LessonService(LessonRepository repository) {
        this.repository = repository;
    }

    public List<Lesson> getAllLessons() {
        return repository.findAll();
    }

    public Optional<Lesson> getLessonById(UUID id) {
        return repository.findById(id);
    }

    public Lesson saveLesson(Lesson lesson) {
        return repository.save(lesson);
    }

    public void deleteLesson(UUID id) {
        repository.deleteById(id);
    }
}