package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;

public interface IAppointmentService {

	public ApiResponse addAppointment(AppointmentDTO appointment);

}