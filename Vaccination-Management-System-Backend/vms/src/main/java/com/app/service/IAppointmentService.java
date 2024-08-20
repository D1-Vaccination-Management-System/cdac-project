package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.dto.AppointmentDetails2DTO;
import com.app.dto.HomeVisitAppointmentDTO;

public interface IAppointmentService {

	public ApiResponse addAppointment(AppointmentDTO appointment);

	List<HomeVisitAppointmentDTO> getScheduledHomeVisitAppointments(Long centerId);

	public String assignVaccineToAppointment(AppointmentDetails2DTO dto);

	public String assignVaccineToAppointmentDue(AppointmentDetails2DTO dto);

	List<HomeVisitAppointmentDTO> getScheduledCenterVisitAppointments(Long centerId);

}