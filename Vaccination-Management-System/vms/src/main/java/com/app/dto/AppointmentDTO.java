package com.app.dto;

import java.time.LocalDateTime;

import com.app.entities.Appointment_Type;

import io.swagger.v3.oas.annotations.media.Schema;
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
	
	private Long vaccination_center_id;
	
	private LocalDateTime bookedAppointmentDate;


    @Schema(enumAsRef = true, description = "Type of the appointment")
    private Appointment_Type appointmentType;

	

}
