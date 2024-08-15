package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.HealthStaffDTO;
import com.app.dto.LoginDTO;
import com.app.entities.Appointments;
import com.app.entities.HealthStaff;
import com.app.enums.Role;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IAppointmentRepo;
import com.app.repo.IHealthStaffRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class HealthStaffService implements IHealthStaffService {

	@Autowired
	private IHealthStaffRepo healthStaffRepo;

	@Autowired
	private IAppointmentRepo appointmentRepo;

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

	@Override
	public List<Appointments> getAllAppointmentsByStaffId(Long staffId) {
		if (healthStaffRepo.existsById(staffId)) {
			HealthStaff staff = healthStaffRepo.findById(staffId)
					.orElseThrow(() -> new ResourceNotFoundException("Staff Not found!"));
		}
		return appointmentRepo.findAByStaff_userId(staffId);
	}

	@Override
	public List<HealthStaff> getAllStaffByCenterId(Long centerId) {
		return healthStaffRepo.findByCenterId(centerId)
				.orElseThrow(() -> new ResourceNotFoundException("Center Id Invalid!"));
	}

//
//	public HealthStaff getHealthStaffWithAllItsAppointments(String email) {
//		HealthStaff staffWithAllItsAppointments = healthStaffRepo.getStaffWithAllAppointmentDetails(email)
//				.orElseThrow(() -> new ResourceNotFoundException("No Staff Found!"));
//		staffWithAllItsAppointments.getListOfAppointments().size();
//		return staffWithAllItsAppointments;
//
//	}
}