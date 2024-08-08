package com.app.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetVaccinationCenterDetailsDTO {
	private VaccinationCenterDTO vaccinationCenterDto;
	private List<VaccineDTO> vaccineDto;
}
