package org.example.config;

import org.example.entity.ClinicalCase;
import org.example.entity.Course;
import org.example.entity.DoctorProfile;
import org.example.entity.Lesson;
import org.example.repository.ClinicalCaseRepository;
import org.example.repository.CourseRepository;
import org.example.repository.DoctorProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final DoctorProfileRepository doctorProfileRepository;
    private final ClinicalCaseRepository clinicalCaseRepository;
    private final CourseRepository courseRepository;

    public DataSeeder(DoctorProfileRepository doctorProfileRepository, ClinicalCaseRepository clinicalCaseRepository, CourseRepository courseRepository) {
        this.doctorProfileRepository = doctorProfileRepository;
        this.clinicalCaseRepository = clinicalCaseRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed the database with the doctor's profile if it's empty
        if (doctorProfileRepository.count() == 0) {
            
            String bioAndEducation = "Dr. Elbek Mamatkulov is the Head Pediatric Endocrinologist at the National Children's Medical Center in Tashkent. He has completed international clinical fellowships in pediatric endocrinology at Pusan National University Yangsan Hospital (Korea) and the Royal Hospital for Children, Glasgow (Scotland). He is an active member of ESPE and SSIEM.\n\n" +
                                     "Education & Fellowships:\n" +
                                     "• Master's Degree in Endocrinology, Tashkent Medical Academy (2018)\n" +
                                     "• Pediatric Endocrinology Fellowship, Pusan National University Yangsan Hospital, Korea (2020)\n" +
                                     "• ESPE Clinical Fellowship, Royal Hospital for Children, Glasgow, Scotland (2024)";
                                     
            String publicationsList = "• Mosaic Form of Turner Syndrome with Normal Stature: A Rare Clinical Presentation (2025)\n" +
                                      "• Report of a case of central precocious puberty in a boy associated with pilocytic astrocytoma (2025)\n" +
                                      "• Use of the Synacthen test for confirming suspected adrenal insufficiency in children (2025)\n" +
                                      "• Endocrine and metabolic complications according to genotype in Prader-Willi syndrome (ESPE 2021)";

            DoctorProfile profile = DoctorProfile.builder()
                    .name("Mamatkulov Elbek Abdumonnanovich")
                    .credentials("Head Pediatric Endocrinologist & PhD Researcher")
                    .clinicLocation("National Children’s Medical Center in Tashkent (NCMC), Tashkent, Uzbekistan")
                    .contactDetails("elbekmamatkulov1990@gmail.com | +998901876896 | +998900029797")
                    .biography(bioAndEducation)
                    .publications(publicationsList)
                    .build();

            doctorProfileRepository.save(profile);
            System.out.println("DataSeeder: Successfully inserted Dr. Mamatkulov's profile into the database!");
        }

        // Seed some sample Clinical Cases if empty
        if (clinicalCaseRepository.count() == 0) {
            ClinicalCase case1 = ClinicalCase.builder()
                    .title("Mosaic Form of Turner Syndrome with Normal Stature")
                    .category("Genetics")
                    .presentation("14-year-old female presents with primary amenorrhea and delayed pubertal development, but height is within normal percentiles.")
                    .labResults("{\"karyotype\": \"45,X/46,XX mosaicism\", \"FSH\": \"Elevated\", \"LH\": \"Elevated\", \"Estradiol\": \"Low\"}")
                    .management("Initiation of hormone replacement therapy (estrogen/progesterone) to induce puberty and maintain bone health. Ongoing cardiovascular and renal monitoring.")
                    .isPublished(true)
                    .build();

            ClinicalCase case2 = ClinicalCase.builder()
                    .title("Central Precocious Puberty associated with Pilocytic Astrocytoma")
                    .category("Pituitary")
                    .presentation("5-year-old male with rapid growth acceleration, early development of secondary sexual characteristics, and occasional morning headaches.")
                    .labResults("{\"Testosterone\": \"Pubertal levels\", \"LH\": \"Pubertal levels (basal and stimulated)\", \"MRI\": \"Suprasellar mass consistent with pilocytic astrocytoma\"}")
                    .management("GnRH analog therapy to halt precocious puberty. Coordinated care with pediatric neurosurgery and oncology for the management of the astrocytoma.")
                    .isPublished(true)
                    .build();
                    
            ClinicalCase case3 = ClinicalCase.builder()
                    .title("Confirming Suspected Adrenal Insufficiency Using Synacthen Test")
                    .category("Adrenal")
                    .presentation("8-year-old female with chronic fatigue, unexplained weight loss, and hyperpigmentation of the gums and palmar creases.")
                    .labResults("{\"Basal Cortisol\": \"Low normal\", \"ACTH\": \"Significantly elevated\", \"Synacthen Test\": \"Suboptimal cortisol response (< 500 nmol/L at 30/60 mins)\"}")
                    .management("Immediate initiation of oral hydrocortisone and fludrocortisone. Educated family on stress dosing and emergency hydrocortisone injections.")
                    .isPublished(true)
                    .build();

            clinicalCaseRepository.save(case1);
            clinicalCaseRepository.save(case2);
            clinicalCaseRepository.save(case3);
            System.out.println("DataSeeder: Successfully inserted sample clinical cases into the database!");
        }

        // Seed Medical Courses & Lessons
        if (courseRepository.count() == 0) {
            Course course1 = Course.builder()
                    .title("Management of DKA in Pediatric Patients")
                    .description("A comprehensive guide for residents and pediatricians on identifying and managing Diabetic Ketoacidosis (DKA) safely. Covers fluid resuscitation protocols, insulin therapy, and electrolyte management.")
                    .targetAudience("Pediatric Residents, ER Physicians, Medical Students")
                    .build();

            Lesson lesson1 = Lesson.builder()
                    .course(course1)
                    .title("Module 1: Pathophysiology and Diagnosis")
                    .contentBody("In this module, we review the absolute and relative insulin deficiency that leads to DKA. Key diagnostic criteria: Blood glucose > 200 mg/dL, Venous pH < 7.3 or Bicarbonate < 15 mmol/L, and Ketonemia/Ketonuria.")
                    .videoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ") // Placeholder video
                    .videoProvider("YOUTUBE")
                    .durationMinutes(15)
                    .orderIndex(1)
                    .build();

            Lesson lesson2 = Lesson.builder()
                    .course(course1)
                    .title("Module 2: Two-Bag System for Fluid Management")
                    .contentBody("Explanation of the modern two-bag system to titrate dextrose delivery while maintaining steady insulin and electrolyte infusions.")
                    .videoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ") // Placeholder video
                    .videoProvider("YOUTUBE")
                    .durationMinutes(25)
                    .orderIndex(2)
                    .build();

            // Establish the bidirectional relationship
            course1.getLessons().add(lesson1);
            course1.getLessons().add(lesson2);

            courseRepository.save(course1);
            System.out.println("DataSeeder: Successfully inserted sample Medical Courses into the database!");
        }
    }
}
