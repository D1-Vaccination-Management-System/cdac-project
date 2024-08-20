package com.app.dto;

import java.time.LocalDateTime;

import com.app.entities.Appointment_Status;
import com.app.entities.Appointment_Type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {

	private Long patientId;

	private Long vaccinationCenterId;

	private LocalDateTime bookedAppointmentDate;

	private Appointment_Type appointmentType;
	
	private Appointment_Status appointmentStatus;

}
