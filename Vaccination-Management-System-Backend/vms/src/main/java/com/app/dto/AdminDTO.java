package com.app.dto;

import com.app.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long adminId;

	private String firstName;

	private String lastName;

	private String email;

	private String password;

	private String phoneNumber;

	private String aadharCardNumber;

	@JsonProperty(access = Access.READ_ONLY)
	private AdminVaccineCenterDTO vaccinationCenter;

	@JsonIgnore
	private Role role;

}
