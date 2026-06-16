package org.example.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "clinical_case")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalCase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(name = "category")
    private String category;

    @Column(columnDefinition = "TEXT")
    private String presentation;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "lab_results", columnDefinition = "jsonb")
    private String labResults;

    @Column(columnDefinition = "TEXT")
    private String management;

    @Column(name = "is_published")
    private Boolean isPublished;

    // Optional field for storing an image URL (e.g., X-ray, Ultrasound, or clinical photo)
    @Column(name = "image_url")
    private String imageUrl;
}