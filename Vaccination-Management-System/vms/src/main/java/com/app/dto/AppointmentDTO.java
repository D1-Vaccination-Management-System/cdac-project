package com.app.dto;


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
	private Long doctorId;
	private Long vaccineId;
	private Long appointmentTypeId; 
	private Long appointmentStatusId;
	

}
