package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.dto.HomeVisitAppointmentDTO;

public interface IAppointmentService {

	public ApiResponse addAppointment(AppointmentDTO appointment);

	List<HomeVisitAppointmentDTO> getScheduledHomeVisitAppointments();

}