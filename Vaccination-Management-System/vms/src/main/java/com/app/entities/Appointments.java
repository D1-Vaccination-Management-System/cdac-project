package com.app.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
	@Column(name = "appointment_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long appointmentId;
	
	
	@Column(name = "patient_id", nullable = false)
	private Long patientId;

	
	@Column(name = "vaccination_center_id", nullable = false)
	private Long vaccination_center_id;

	
	@Column(name = "appointment_date", nullable = false)
	private LocalDateTime bookedAppointmentDate;
	

	@Column(name = "booked_datetime", nullable = false)
	@CreationTimestamp
	private LocalDate createdAppointmentOn;
	

	@Column(name = "updated_datetime")
	@UpdateTimestamp
	private LocalDate updatedAppointmentOn;
	

	@Enumerated(EnumType.STRING)
	@Column(name = "appointment_status", length = 30)
	private Appointment_Status appointmentStatus;
	
	
	
	@Enumerated(EnumType.STRING)
	@Column(name = "appointment_type",length = 30)
	private Appointment_Type appointmentType;
	

}
