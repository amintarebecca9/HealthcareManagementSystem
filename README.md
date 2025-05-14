# HealthcareManagementSystem

## Project Overview

The Healthcare Management System (HMS) is a comprehensive platform designed to digitize and streamline healthcare management processes. It enhances doctor-patient interaction, incorporates AI-driven healthcare recommendations, and ensures secure user authentication and role-based access control for doctors, patients, staff, and administrators.

### Key Features

1. **Role Management**:
   - Supports multiple user roles: Patient, Doctor, Staff, and Admin.
   - Role-specific dashboards and functionalities.

2. **Electronic Health Records (EHR)**:
   - Patients can upload medical history, lab reports, and prescriptions.
   - Doctors can update consultation notes and access patient records.

3. **Secure Messaging and Notifications**:
   - Facilitates doctor-patient communication.
   - Automated reminders for appointments and medications.

4. **Document Management**:
   - Role-based access to uploaded documents.
   - Admins have access to all documents, while doctors and patients have restricted access.

5. **Search and Filtering**:
   - Quick retrieval of patient history, medications, and diagnoses.

6. **Data Security and Compliance**:
   - AES encryption for sensitive data (`secure.message.aes.key` in `application.properties`).
   - HIPAA-compliant security protocols.

7. **Frontend**:
   - Built with React and TypeScript.
   - Modern UI with role-specific content (e.g., `/register/page.tsx` for user registration).

8. **Backend**:
   - Spring Boot application with PostgreSQL database.
   - RESTful APIs for seamless integration with the frontend.
   - Configurable properties in `application.properties`.

9. **File Uploads**:
   - Supports secure file uploads with size limits (configured in `application.properties`).

10. **Dashboard**:
    - Role-specific panels (e.g., Doctor Panel, Admin Document Management).
    - Dynamic content loading based on user role.

### Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Spring Boot, Hibernate, PostgreSQL
- **Database**: PostgreSQL
- **Security**: AES encryption, HIPAA compliance
- **Build Tools**: Maven
- **Deployment**: Configurable server port (`8080` by default)

### Setup Instructions

1. **Backend Setup**:
   - Configure the database connection in `backend/src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/healthcare_db
     spring.datasource.username=postgres
     spring.datasource.password=postgres
     ```
   - Run the backend application:
     ```bash
     cd backend
     mvn spring-boot:run
     ```

2. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend/hospitalmanagement
     ```
   - Install dependencies and start the development server:
     ```bash
     npm install
     npm run dev
     ```

3. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8080`

### Future Enhancements

- Integration of AI-driven healthcare recommendations.
- Advanced analytics for patient and hospital data.
- Mobile application support.
