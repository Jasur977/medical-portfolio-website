package org.example.service;

import org.example.entity.Course;
import org.example.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    public List<Course> getAllCourses() {
        return repository.findAll();
    }

    public Optional<Course> getCourseById(UUID id) {
        return repository.findById(id);
    }

    public Course saveCourse(Course course) {
        return repository.save(course);
    }

    public void deleteCourse(UUID id) {
        repository.deleteById(id);
    }
}
