package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.HealthStaffDTO;
import com.app.dto.LoginDTO;
import com.app.entities.Appointments;
import com.app.entities.HealthStaff;

public interface IHealthStaffService {

	public ApiResponse addHealthStaff(HealthStaffDTO healthStaffDTO);

	public HealthStaff loginHealthStaff(LoginDTO healthStaffLoginDTO);

	public List<Appointments> getAllAppointmentsByStaffId(Long staffId);

	public List<HealthStaff> getAllStaffByCenterId(Long centerId);

	void incrementNoOfAppointments(Long staffId);
}
