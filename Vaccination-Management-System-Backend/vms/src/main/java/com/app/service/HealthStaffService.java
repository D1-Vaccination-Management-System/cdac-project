package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.HealthStaffDTO;
import com.app.dto.LoginDTO;
import com.app.entities.HealthStaff;
import com.app.entities.Patient;
import com.app.enums.Role;
import com.app.exception.ApiException;
import com.app.repo.IHealthStaffRepo;

import jakarta.transaction.Transactional;


@Service
public class HealthStaffService implements IHealthStaffService{
	
	@Autowired
	private IHealthStaffRepo healthStaffRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	

	@Override
	public ApiResponse addHealthStaff(HealthStaffDTO healthStaffDTO) {
	
		try {			
			healthStaffDTO.setRole(Role.ROLE_HEALTH_STAFF);
			healthStaffRepo.save(mapper.map(healthStaffDTO, HealthStaff.class));
			return new ApiResponse("Health Staff Added Successfully");
		} catch (Exception e) {
			return new ApiResponse("Health Staff Registration Failed!");
		}
	}



	@Override
	public HealthStaff loginHealthStaff(LoginDTO healthStaffLoginDTO) {
		return healthStaffRepo.findByEmailAndPassword(healthStaffLoginDTO.getEmail(), healthStaffLoginDTO.getPassword())
				.orElseThrow(() -> new ApiException("Invalid Email or Password"));
	}

}
