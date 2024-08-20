package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationCenterSearchDTO {
	private String centerId;
	private String centerName;
	private String phoneNumber;
	private AddressDTO address;
}
