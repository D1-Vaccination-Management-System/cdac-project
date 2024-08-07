package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.GetVaccinationCenterDetailsDTO;
import com.app.dto.VaccinationCenterDTO;
import com.app.dto.VaccineDTO;
import com.app.entities.Address;
import com.app.entities.VaccinationCenter;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IAddressRepo;
import com.app.repo.IVaccinationCenterRepo;
import com.app.repo.IVaccineRepo;

@Service
@Transactional
public class VaccinationCenterService implements IVaccinationCenterService {
	@Autowired
	private IVaccinationCenterRepo vaccinationCenter;

	@Autowired
	private IAddressRepo addressRepo;

	@Autowired
	private IVaccineRepo vaccineRepo;
	
	@Autowired
	private VaccineService vaccineService;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addVaccinationCenter(VaccinationCenterDTO dto) {
		VaccinationCenter vc = mapper.map(dto, VaccinationCenter.class);
		String centerName = vc.getCenterName().toLowerCase();
		if (!vaccinationCenter.existsByCenterName(centerName)) {
			Address address = mapper.map(dto.getAddress(), Address.class);
	        addressRepo.save(address);
	        vc.setAddress(address);
	        vaccinationCenter.save(vc);
			
		} else {
			throw new ApiException("Center Already Exists!");
		}
		return new ApiResponse("Vaccination Center Added Successfully");
	}

	@Override
	public ApiResponse updateVaccinationCenter(Long id, VaccinationCenterDTO dto) {
		VaccinationCenter center = vaccinationCenter.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Vaccination Center not found"));
		Address address = addressRepo.findById(center.getAddress().getAddressId())
				.orElseThrow(() -> new ResourceNotFoundException("Address not found"));
		center.setCenterName(dto.getCenterName());
		center.setPhoneNumber(dto.getPhoneNumber());
		address.setCity(dto.getAddress().getCity());
		address.setState(dto.getAddress().getState());
		address.setStreet(dto.getAddress().getStreet());
		address.setZipCode(dto.getAddress().getZipCode());
		return new ApiResponse("Vaccination Center Updated Succesfully");
	}

	@Override
	public GetVaccinationCenterDetailsDTO getAllDetails(Long id) {
		VaccinationCenter center = vaccinationCenter.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Vaccination Center not found"));
		List<VaccineDTO> vaccines = vaccineService.getAllVaccines(id);
		return new GetVaccinationCenterDetailsDTO(mapper.map(center, VaccinationCenterDTO.class), vaccines);
	}
	
	@Override
	public ApiResponse deleteVaccinationCenter(Long id)
	{
		if(vaccinationCenter.existsById(id)){
			vaccinationCenter.deleteById(id);
		}
		else
			throw new ResourceNotFoundException("Center doesnt exist");
		
		return new ApiResponse("Center Deleted Successfully");
	}
}
