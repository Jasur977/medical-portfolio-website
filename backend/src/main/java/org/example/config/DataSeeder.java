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
        // Seed or update the database with the doctor's profile
        String bioAndEducation = "Dr. Elbek Mamatkulov — Bolalar va kattalarda murakkab va kam uchrovchi gormonal hamda metabolik kasalliklar bo'yicha mutaxassis. Umumiy ish tajribasi: 11 yil.\n\n" +
                                 "Xalqaro malaka va stajirovkalar:\n" +
                                 "• 2026: ESE Postgraduate Training Course in Clinical Endocrinology (Litva 🇱🇹)\n" +
                                 "• 2024: Royal Hospital for Children, Glazgo — Clinical Fellowship (Buyuk Britaniya 🇬🇧)\n" +
                                 "• 2024: Salzburg OMI seminari — Tibbiyotda ta'lim (Avstriya 🇦🇹)\n" +
                                 "• 2024: ESPE Kavkaz va Markaziy Osiyo maktabi (O'zbekiston 🇪🇺🇺🇿)\n" +
                                 "• 2024: 10-Xalqaro DSD simpoziumi va PG kursi (Shveysariya 🇨🇭)\n" +
                                 "• 2023: Salzburg CHOP seminari — Bolalar endokrinologiyasi (Avstriya 🇦🇹)\n" +
                                 "• 2022: 9-Xalqaro DSD simpoziumi va PG kursi (Shveysariya 🇨🇭)\n" +
                                 "• 2022: Radboudumc Adrenal Masterclass (Niderlandiya 🇳🇱)\n" +
                                 "• 2021: ESPE Kavkaz va Markaziy Osiyo maktabi (Gruziya 🇬🇪)\n" +
                                 "• 2019-2020: Pusan National University Yangsan Hospital Fellowship (Janubiy Koreya 🇰🇷)\n\n" +
                                 "Ish faoliyati va ta'lim:\n" +
                                 "• 2020 – h.v.: Bolalar milliy tibbiyot markazi (NCMC) bo'lim boshlig'i, vrach endokrinologi & Neoclinic shifokori\n" +
                                 "• 2018–2019: Bekobod shahar markaziy shifoxonasi bolalar va kattalar endokrinologi\n" +
                                 "• 2018–2019: 'Shox Med' xususiy klinikasi shifokor-endokrinologi\n" +
                                 "• 2016–2019: Toshkent Tibbiyot Akademiyasi 3-klinikasi shoshilinch endokrinologiya shifokori\n" +
                                 "• 2015–2016: Bekobod tuman QVP umumiy amaliyot shifokori\n" +
                                 "• 2015–2018: Toshkent Tibbiyot Akademiyasi — Endokrinologiya magistraturasi\n" +
                                 "• 2009–2015: Toshkent Tibbiyot Akademiyasi — Davolash ishi fakulteti";

        String publicationsList = "• Mosaic Form of Turner Syndrome with Normal Stature: A Rare Clinical Presentation (2025)\n" +
                                  "• Report of a case of central precocious puberty in a boy associated with pilocytic astrocytoma (2025)\n" +
                                  "• Use of the Synacthen test for confirming suspected adrenal insufficiency in children (2025)\n" +
                                  "• Endocrine and metabolic complications according to genotype in Prader-Willi syndrome (ESPE 2021)";

        if (doctorProfileRepository.count() == 0) {
            DoctorProfile profile = DoctorProfile.builder()
                    .name("Dr. Elbek Mamatkulov")
                    .credentials("Pediatric & Adult Endocrinologist • Head of Department (NCMC)")
                    .clinicLocation("National Children’s Medical Center in Tashkent (NCMC) & Neoclinic, Tashkent, Uzbekistan")
                    .contactDetails("elbekmamatkulov1990@gmail.com | +998 91 011 77 11")
                    .biography(bioAndEducation)
                    .publications(publicationsList)
                    .appointmentBookingLink("https://t.me/elbekendokrinolog")
                    .build();

            doctorProfileRepository.save(profile);
            System.out.println("DataSeeder: Successfully inserted Dr. Mamatkulov's profile into the database!");
        } else {
            DoctorProfile profile = doctorProfileRepository.findAll().get(0);
            profile.setName("Dr. Elbek Mamatkulov");
            profile.setCredentials("Pediatric & Adult Endocrinologist • Head of Department (NCMC)");
            profile.setClinicLocation("National Children’s Medical Center in Tashkent (NCMC) & Neoclinic, Tashkent, Uzbekistan");
            profile.setContactDetails("elbekmamatkulov1990@gmail.com | +998 91 011 77 11");
            profile.setBiography(bioAndEducation);
            profile.setAppointmentBookingLink("https://t.me/elbekendokrinolog");
            doctorProfileRepository.save(profile);
            System.out.println("DataSeeder: Successfully refreshed Dr. Mamatkulov's profile in the database!");
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
