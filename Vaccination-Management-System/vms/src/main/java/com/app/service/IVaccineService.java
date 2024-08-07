package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.VaccineDTO;
import com.app.entities.Vaccines;

public interface IVaccineService {

	Vaccines addVaccine(VaccineDTO vaccineDTO, Long centerId);

	List<VaccineDTO> getAllVaccines(Long centerId);

	ApiResponse deleteVaccineByVaccineId(Long centerId);

}