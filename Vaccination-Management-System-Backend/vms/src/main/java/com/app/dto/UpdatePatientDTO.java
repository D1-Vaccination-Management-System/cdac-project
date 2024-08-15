package com.app.dto;

import com.app.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdatePatientDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String aadharCardNumber;
	@JsonIgnore
	private Role role;

}
