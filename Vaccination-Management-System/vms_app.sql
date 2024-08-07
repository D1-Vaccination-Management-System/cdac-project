CREATE TABLE Address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

CREATE TABLE PATIENTS (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone_number VARCHAR(15),
    address_id INT NOT NULL,
    aadhar_card_number CHAR(12) UNIQUE NOT NULL,
    time_registered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    FOREIGN KEY (address_id) REFERENCES Address(address_id)
);

CREATE TABLE Doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(15),
    email VARCHAR(255) UNIQUE,
    address_id INT,
    aadhar_card_number CHAR(12) UNIQUE,
    specialization_id INT,
    years_of_experience INT,
    rating INT,
    time_registered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    FOREIGN KEY (address_id) REFERENCES Address(address_id),
    FOREIGN KEY (specialization_id) REFERENCES Specialization(specialization_id)
);

CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    aadhar_card_number CHAR(12) UNIQUE,
    date_registered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

CREATE TABLE Specialization (
    specialization_id INT AUTO_INCREMENT PRIMARY KEY,
    specialization_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

CREATE TABLE Vaccination_Center (
    center_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    center_name VARCHAR(255),
    phone_number VARCHAR(15),
    capacity INT,
    address_id INT,
    rating INT,
    description VARCHAR(512),
    time_registered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    FOREIGN KEY (address_id) REFERENCES Address(address_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);

CREATE TABLE Vaccines (
    vaccine_id INT AUTO_INCREMENT PRIMARY KEY,
    vaccine_name VARCHAR(255),
    description TEXT,
    age_group VARCHAR(50),
    date_added DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

CREATE TABLE Appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    vaccine_id INT,
    appointment_datetime DATETIME,
    appointment_type_id INT,
    appointment_status_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    FOREIGN KEY (patient_id) REFERENCES PATIENTS(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
    FOREIGN KEY (vaccine_id) REFERENCES Vaccines(vaccine_id),
    FOREIGN KEY (appointment_type_id) REFERENCES Appointment_Type(appointment_type_id),
    FOREIGN KEY (appointment_status_id) REFERENCES Appointment_Status(appointment_status_id)
);

CREATE TABLE Appointment_Type (
    appointment_type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

CREATE TABLE Appointment_Status (
    appointment_status_id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(255),
    status_reason TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100)
);

CREATE TABLE Vaccination_History (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    vaccine_id INT,
    patient_id INT,
    center_id INT,
    vaccination_datetime DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    FOREIGN KEY (vaccine_id) REFERENCES Vaccines(vaccine_id),
    FOREIGN KEY (patient_id) REFERENCES PATIENTS(patient_id),
    FOREIGN KEY (center_id) REFERENCES Vaccination_Center(center_id)
);

CREATE TABLE Hospital_Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(15),
    role VARCHAR(100),
    center_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    FOREIGN KEY (center_id) REFERENCES Vaccination_Center(center_id)
);

CREATE TABLE Vaccine_Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    vaccine_id INT,
    center_id INT,
    quantity INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vaccine_id) REFERENCES Vaccines(vaccine_id),
    FOREIGN KEY (center_id) REFERENCES Vaccination_Center(center_id)
);
