package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.VaccineDTO;

public interface IVaccineService {

	ApiResponse addVaccine(VaccineDTO vaccineDTO, Long centerId);

	List<VaccineDTO> getAllVaccines(Long centerId);

	ApiResponse deleteVaccineByVaccineId(Long centerId);

}