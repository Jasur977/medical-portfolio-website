Medical Professional Platform: Project Overview
1. Executive Summary
   A full-stack web application designed for a practicing endocrinologist. The platform serves a dual purpose: acting as a professional digital portfolio for patient information and serving as an educational hub for medical professionals via structured clinical case studies and medical tutorials.

2. Technology Stack
   Backend: Java Spring Boot, Spring Data JPA, Spring Security

Frontend: React (Vite/javascript), Tailwind CSS (for styling)

Database: PostgreSQL (Local Docker environment)

Build Tool: Maven

3. Core Features & Modules
   Module A: Professional Profile (Public Facing)
   Biography & Credentials: Board certifications, education, clinical focus.

Clinic Information: Location, contact details, appointment booking links or instructions.

Publications/Research: A list of published papers or guideline contributions (e.g., ESPE, ADA, ATA summaries).

Module B: Clinical Case Repository (Medical Audience)
A database of structured endocrine case studies.

Case Structure:

Presentation: Age, sex, chief complaint (e.g., "8-year-old female with premature thelarche").

Clinical History: History of present illness, family history.

Diagnostics: Lab results (hormone panels, dynamic testing like GnRH stimulation), imaging (bone age X-rays, pelvic ultrasounds).

Diagnosis & Management: Treatment plan and follow-up.

Filtering: Users can search cases by category (e.g., Thyroid, Adrenal, Pituitary, Diabetes, Growth).

Module C: Medical Education & Tutorials
Structured courses aimed at training other doctors, residents, and fellows.

Course Structure: Each course contains multiple lessons or modules.

Content Types: Video embeds, downloadable PDF guidelines, and rich text.

Target Audience: General pediatricians, family physicians, and endocrinology fellows.

4. Initial Database Schema Blueprint
   Here is the initial data model we will ask Gemini to build:

1. DoctorProfile Table
   Stores the static bio and clinic information.
2. ClinicalCase Table

id (UUID)

title (String) - e.g., "Atypical Congenital Adrenal Hyperplasia"

category (String) - e.g., "Adrenal"

presentation (Text)

lab_results (JSONB) - Storing labs as JSON allows flexibility for different hormone panels.

management (Text)

is_published (Boolean)

3. Course Table

id (UUID)

title (String) - e.g., "Management of DKA in Pediatric Patients"

description (Text)

target_audience (String)
4. Lesson Table

id (UUID)

course_id (UUID, Foreign Key)

title (String)

content_body (Text) - For text notes below the video

video_url (String) - The embed link from Vimeo/YouTube/S3

video_provider (String) - e.g., "VIMEO", "YOUTUBE", "DIRECT"

duration_minutes (Integer)

order_index (Integer)