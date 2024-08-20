package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DoctorDTO {
	

	private String firstName;

	private String lastName;

	private String email;

	private String phoneNumber;

	private String aadharCardNumber;

	private SpecializationDTO specializationDTO;

	private Integer yearsOfExperience;

}
