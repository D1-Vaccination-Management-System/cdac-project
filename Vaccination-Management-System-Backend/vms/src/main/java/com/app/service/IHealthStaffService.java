package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.HealthStaffDTO;
import com.app.dto.LoginDTO;
import com.app.entities.HealthStaff;

public interface IHealthStaffService {

	public ApiResponse addHealthStaff(HealthStaffDTO healthStaffDTO);

	public HealthStaff loginHealthStaff(LoginDTO healthStaffLoginDTO);
}
