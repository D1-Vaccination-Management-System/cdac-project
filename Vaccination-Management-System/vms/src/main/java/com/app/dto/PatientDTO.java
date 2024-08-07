package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String phoneNumber;
	private AddressDTO address;
	private String aadharCardNumber;

}
