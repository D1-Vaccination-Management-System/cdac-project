package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDetailsDTO;
import com.app.dto.HealthStaffDTO;
import com.app.dto.HealthStaffUpdateDTO;
import com.app.dto.LoginDTO;
import com.app.dto.StaffandAppointmentIdDTO;
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
	public List<AppointmentDetailsDTO> getAllAppointmentsByStaffId(Long staffId) {
		// Fetch the HealthStaff entity and throw an exception if not found
		@SuppressWarnings("unused")
		HealthStaff staff = healthStaffRepo.findById(staffId)
				.orElseThrow(() -> new ResourceNotFoundException("Staff Not found with ID: " + staffId));

		List<AppointmentDetailsDTO> appDetails =  appointmentRepo.getAllAppointmentsByStaffId(staffId);
		 appDetails.stream().filter(appointment -> appointment.getVaccineName() != null);
		 return appDetails;
	}

	@Override
	public List<HealthStaff> getAllStaffByCenterId(Long centerId) {
		return healthStaffRepo.findByCenterId(centerId)
				.orElseThrow(() -> new ResourceNotFoundException("Center Id Invalid!"));
	}

	@Override
	public ApiResponse updateHealthStaff(String email, HealthStaffUpdateDTO healthStaffUpdateDTO) {
		try {
			HealthStaff staff = healthStaffRepo.findByEmail(email)
					.orElseThrow(() -> new ResourceNotFoundException("Staff Not Found!"));
			staff.setEmail(healthStaffUpdateDTO.getEmail());
			staff.setPassword(healthStaffUpdateDTO.getPassword());
			staff.setFirstName(healthStaffUpdateDTO.getFirstName());
			staff.setLastName(healthStaffUpdateDTO.getLastName());
			staff.setPassword(healthStaffUpdateDTO.getPassword());
			healthStaffRepo.save(staff);

		} catch (Exception e) {
			return new ApiResponse("Error while Updating the Health Staff");
		}
		return new ApiResponse("Staff Updated Successfully!");
	}
	
	@Override
	public String increaseAppointment(StaffandAppointmentIdDTO dto)
	{
		HealthStaff staff = healthStaffRepo.findById(dto.getId()).orElseThrow(()-> new ResourceNotFoundException("Staff not found"));
		staff.setNoOfAppointments(staff.getNoOfAppointments() + 1);
		Appointments app = appointmentRepo.findById(dto.getAppointmentId()).orElseThrow(()-> new ResourceNotFoundException("Appointment not found"));
		app.setStaff(staff);
		return "Success";
	}

//	public HealthStaff getHealthStaffWithAllItsAppointments(String email) {
//		HealthStaff staffWithAllItsAppointments = healthStaffRepo.getStaffWithAllAppointmentDetails(email)
//				.orElseThrow(() -> new ResourceNotFoundException("No Staff Found!"));
//		staffWithAllItsAppointments.getListOfAppointments().size();
//		return staffWithAllItsAppointments;
//
//	}
	
	public List<AppointmentDetailsDTO> getAppointmentsWithNullVaccines(Long StaffID)
	{
		return appointmentRepo.findAppointmentsWithNullVaccine(StaffID);
	}

}
