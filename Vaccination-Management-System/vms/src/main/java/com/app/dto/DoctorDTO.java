package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
	private Long doctorId;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String aadharCardNumber;
	private SpecializationDTO specializationDTO;
	private int yearsOfExperience;
}
