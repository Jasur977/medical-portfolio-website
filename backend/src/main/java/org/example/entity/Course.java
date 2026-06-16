package org.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "target_audience")
    private String targetAudience;
    
    // Optional field for a thumbnail image of the course
    @Column(name = "image_url")
    private String imageUrl;
    
    // Bidirectional relationship so a Course knows about its Lessons automatically
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC") // Ensure lessons are returned in the correct order
    @Builder.Default
    private List<Lesson> lessons = new ArrayList<>();
}
