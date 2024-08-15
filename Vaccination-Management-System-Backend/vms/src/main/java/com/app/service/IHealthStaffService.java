package com.app.service;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.ApiResponse;
import com.app.dto.HealthStaffDTO;
import com.app.dto.LoginDTO;
import com.app.entities.HealthStaff;
import com.app.entities.Patient;

public interface IHealthStaffService {

	public ApiResponse addHealthStaff(HealthStaffDTO healthStaffDTO);

	public HealthStaff loginHealthStaff(LoginDTO healthStaffLoginDTO);

	HealthStaff getHealthStaffWithAllItsAppointments(String email);

}
