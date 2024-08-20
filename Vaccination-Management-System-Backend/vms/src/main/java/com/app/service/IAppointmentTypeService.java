package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentTypeDTO;
import com.app.dto.AppointmentTypeUpdateDTO;

public interface IAppointmentTypeService {
	public ApiResponse addAppointmentType(AppointmentTypeDTO appointmentTypeDTO);

	public ApiResponse updateAppointmentType(AppointmentTypeUpdateDTO appointmentTypeUpdateDTO);
}