package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.VaccineDTO;
import com.app.entities.VaccinationCenter;
import com.app.entities.Vaccines;
import com.app.repo.IVaccinationCenterRepo;
import com.app.repo.IVaccineRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class VaccineService implements IVaccineService {

	@Autowired
	private IVaccineRepo vaccineRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IVaccinationCenterRepo vaccinationCenterRepo;

	@Override
	public ApiResponse addVaccine(VaccineDTO vaccineDTO, Long centerId) {
		VaccinationCenter center = vaccinationCenterRepo.findById(centerId)
				.orElseThrow(() -> new RuntimeException("Center not found"));
		Vaccines vaccine = mapper.map(vaccineDTO, Vaccines.class);
		vaccine.setVaccinationCenter(center);
		vaccineRepo.save(vaccine);
		return new ApiResponse("Vaccine added Successfully");
	}

	@Override
	public List<VaccineDTO> getAllVaccines(Long centerId) {
		List<Vaccines> vaccinesList = vaccineRepo.findByVaccinationCenterId(centerId);
		return vaccinesList.stream().map(vaccine -> mapper.map(vaccine, VaccineDTO.class)).collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteVaccineByVaccineId(Long centerId) {
		if (!vaccineRepo.existsById(centerId)) {
			return new ApiResponse("Vaccine Deleted Failed!");
		}

		else {
			vaccineRepo.deleteById(centerId);
			return new ApiResponse("Vaccine Deleted Successfully!");
		}

	}
}