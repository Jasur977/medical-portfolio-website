package org.example.controller;

import org.example.service.ClinicalCaseService;
import org.example.service.CourseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final CourseService courseService;
    private final ClinicalCaseService clinicalCaseService;

    public SearchController(CourseService courseService, ClinicalCaseService clinicalCaseService) {
        this.courseService = courseService;
        this.clinicalCaseService = clinicalCaseService;
    }

    @GetMapping
    public Map<String, Object> search(@RequestParam String query) {
        Map<String, Object> results = new HashMap<>();
        results.put("courses", courseService.searchCourses(query));
        results.put("cases", clinicalCaseService.searchCases(query));
        return results;
    }
}