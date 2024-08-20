package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDetailsDTO {
	private Long appointmentId;
    private String patientName;
    private String patientStreet;
    private String patientCity;
    private String patientState;
    private String patientZipCode;
    private String vaccineName;
    private LocalDateTime appointmentDate;  
}
