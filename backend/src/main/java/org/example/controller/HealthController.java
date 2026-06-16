package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the Medical Professional Platform API!";
    }

    @GetMapping("/api/health")
    public String healthCheck() {
        return "Backend is running and connected to the database successfully.";
    }
}
