package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDetailsDTO;
import com.app.dto.HealthStaffDTO;
import com.app.dto.HealthStaffUpdateDTO;
import com.app.dto.LoginDTO;
import com.app.dto.StaffandAppointmentIdDTO;
import com.app.entities.Appointments;
import com.app.entities.HealthStaff;

public interface IHealthStaffService {

	public ApiResponse addHealthStaff(HealthStaffDTO healthStaffDTO);

	public HealthStaff loginHealthStaff(LoginDTO healthStaffLoginDTO);

	public List<AppointmentDetailsDTO> getAllAppointmentsByStaffId(Long staffId);

	public List<HealthStaff> getAllStaffByCenterId(Long centerId);

	public ApiResponse updateHealthStaff(String email, HealthStaffUpdateDTO healthStaffUpdateDTO);
	
	public String increaseAppointment(StaffandAppointmentIdDTO dto);
	
	public List<AppointmentDetailsDTO> getAppointmentsWithNullVaccines(Long StaffID);

}
