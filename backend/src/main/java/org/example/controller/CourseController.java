package org.example.controller;

import org.example.entity.Course;
import org.example.entity.Lesson;
import org.example.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return service.getAllCourses();
    }

    @GetMapping("/search")
    public List<Course> searchCourses(@RequestParam String query) {
        return service.searchCourses(query);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable UUID id) {
        return service.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        // Ensure bidirectional relationship is set before saving
        if (course.getLessons() != null) {
            for (Lesson lesson : course.getLessons()) {
                lesson.setCourse(course);
            }
        }
        return service.saveCourse(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable UUID id, @RequestBody Course courseDetails) {
        return service.getCourseById(id)
                .map(existingCourse -> {
                    existingCourse.setTitle(courseDetails.getTitle());
                    existingCourse.setDescription(courseDetails.getDescription());
                    existingCourse.setTargetAudience(courseDetails.getTargetAudience());
                    if (courseDetails.getImageUrl() != null) {
                        existingCourse.setImageUrl(courseDetails.getImageUrl());
                    }
                    
                    // Clear existing lessons and add new ones to maintain relationship
                    existingCourse.getLessons().clear();
                    if (courseDetails.getLessons() != null) {
                        for (Lesson lesson : courseDetails.getLessons()) {
                            lesson.setCourse(existingCourse);
                            existingCourse.getLessons().add(lesson);
                        }
                    }
                    
                    return ResponseEntity.ok(service.saveCourse(existingCourse));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id) {
        service.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}