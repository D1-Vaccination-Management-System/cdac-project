package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.GetVaccinationCenterDetailsDTO;
import com.app.dto.VaccinationCenterDTO;
import com.app.dto.VaccinationCenterSearchDTO;
import com.app.entities.Appointments;

public interface IVaccinationCenterService {

	ApiResponse addVaccinationCenter(VaccinationCenterDTO dto);

	ApiResponse updateVaccinationCenter(Long id, VaccinationCenterDTO dto);

	GetVaccinationCenterDetailsDTO getAllDetails(Long id);
	
	ApiResponse deleteVaccinationCenter(Long id);
	
	List<VaccinationCenterSearchDTO> getCentersByCityAndState(String city, String state);

	List<VaccinationCenterSearchDTO> getCenterByZipCode(String pinCode);
	
	List<Appointments> getAllAppointments(Long centerId);
}