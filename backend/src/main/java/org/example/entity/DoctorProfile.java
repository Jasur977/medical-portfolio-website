package org.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "doctor_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String biography;

    @Column(columnDefinition = "TEXT")
    private String credentials;

    @Column(name = "clinic_location")
    private String clinicLocation;

    @Column(name = "contact_details")
    private String contactDetails;

    @Column(name = "appointment_booking_link")
    private String appointmentBookingLink;
    
    @Column(columnDefinition = "TEXT")
    private String publications;
}
