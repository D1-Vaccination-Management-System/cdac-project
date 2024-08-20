package com.app.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")
public class Appointments extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id", nullable = false)
    private Long appointmentId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "staff_id", nullable = true)
    private HealthStaff staff;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vaccination_center_id", nullable = false)
    private VaccinationCenter vaccinationCenter;
    

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vaccine_id", nullable = true)
    private Vaccines vaccine;

    @Column(name = "appointment_date", nullable = false)
    private LocalDateTime bookedAppointmentDate;

    @CreationTimestamp
    @Column(name = "booked_datetime", nullable = false, updatable = false)
    private LocalDateTime createdAppointmentOn;

    @UpdateTimestamp
    @Column(name = "updated_datetime")
    private LocalDateTime updatedAppointmentOn;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_status", length = 30)
    private Appointment_Status appointmentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_type", length = 30)
    private Appointment_Type appointmentType;
}
