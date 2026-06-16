package org.example.controller;

import org.example.entity.Course;
import org.example.entity.Lesson;
import org.example.repository.CourseRepository;
import org.example.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService service;
    private final CourseRepository courseRepository;

    public LessonController(LessonService service, CourseRepository courseRepository) {
        this.service = service;
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Lesson> getAllLessons() {
        return service.getAllLessons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable UUID id) {
        return service.getLessonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createLesson(@RequestBody Map<String, Object> payload) {
        try {
            UUID courseId = UUID.fromString((String) payload.get("courseId"));
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            Lesson lesson = Lesson.builder()
                    .course(course)
                    .title((String) payload.get("title"))
                    .contentBody((String) payload.get("contentBody"))
                    .videoUrl((String) payload.get("videoUrl"))
                    .videoProvider((String) payload.get("videoProvider"))
                    .durationMinutes((Integer) payload.get("durationMinutes"))
                    .orderIndex((Integer) payload.get("orderIndex"))
                    .build();

            Lesson savedLesson = service.saveLesson(lesson);
            return ResponseEntity.ok(savedLesson);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating lesson: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable UUID id, @RequestBody Map<String, Object> payload) {
        try {
            return service.getLessonById(id)
                .map(existingLesson -> {
                    existingLesson.setTitle((String) payload.get("title"));
                    existingLesson.setContentBody((String) payload.get("contentBody"));
                    existingLesson.setVideoUrl((String) payload.get("videoUrl"));
                    existingLesson.setVideoProvider((String) payload.get("videoProvider"));
                    existingLesson.setDurationMinutes((Integer) payload.get("durationMinutes"));
                    existingLesson.setOrderIndex((Integer) payload.get("orderIndex"));
                    
                    Lesson updatedLesson = service.saveLesson(existingLesson);
                    return ResponseEntity.ok(updatedLesson);
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating lesson: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable UUID id) {
        service.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }
}
