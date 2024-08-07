package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.entities.Appointments;
import com.app.repo.IAppointmentRepo;

@Service
@Transactional
public class AppointmentService implements IAppointmentService {

	@Autowired
	private IAppointmentRepo appointmentRepo; 
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public ApiResponse addAppointment(AppointmentDTO appointmentDTO) {
		
			Appointments appointment = mapper.map(appointmentDTO, Appointments.class);
			appointmentRepo.save(appointment);
			return new ApiResponse("Appointment Added Successfully!");
		
	}
}
