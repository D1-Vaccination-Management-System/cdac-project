package com.app.dto;

import java.time.LocalDateTime;

import com.app.entities.Appointment_Status;
import com.app.entities.Appointment_Type;
import com.app.entities.HealthStaff;
import com.app.entities.Patient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HomeVisitAppointmentDTO {

	private Long appointmentId;

	private HealthStaff staff;

	private Patient patient;

	private LocalDateTime bookedAppointmentDate;

	private LocalDateTime createdAppointmentOn;

	private LocalDateTime updatedAppointmentOn;

	private Appointment_Status appointmentStatus;

	private Appointment_Type appointmentType;
}
