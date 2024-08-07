package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentTypeDTO;
import com.app.dto.AppointmentTypeUpdateDTO;
import com.app.entities.AppointmentType;
import com.app.repo.IAppointmentTypeRepo;

@Service
@Transactional
public class AppointmentTypeService implements IAppointmentTypeService {

	@Autowired
	private IAppointmentTypeRepo appointmentTypeRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addAppointmentType(AppointmentTypeDTO appointmentTypeDTO) {
		AppointmentType appointmentType = mapper.map(appointmentTypeDTO, AppointmentType.class);
		appointmentTypeRepo.save(appointmentType);
		return new ApiResponse("Appointment Type Added Successfully!");
	}

	@Override
	public ApiResponse updateAppointmentType(AppointmentTypeUpdateDTO appointmentTypeUpdateDTO) {
//		System.out.println("Received DTO: " + appointmentTypeDTO);
		AppointmentType appointmentType = mapper.map(appointmentTypeUpdateDTO, AppointmentType.class);
		if (appointmentType.getAppointmentTypeId() == null
				|| !appointmentTypeRepo.existsById(appointmentType.getAppointmentTypeId())) {
			return new ApiResponse("Appointment Type does not Exist!");
		} else {
			appointmentType.setTypeDescription(appointmentTypeUpdateDTO.getTypeDescription());
			System.out.println("Mapped Entity: " + appointmentType);
			// No need, just good Practice
			appointmentTypeRepo.save(appointmentType);
			return new ApiResponse("Appointment Type Updated Successfully!");
		}

	}

}
