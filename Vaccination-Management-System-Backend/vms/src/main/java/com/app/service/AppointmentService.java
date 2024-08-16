package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.dto.HomeVisitAppointmentDTO;
import com.app.entities.Appointment_Status;
import com.app.entities.Appointment_Type;
import com.app.entities.Appointments;
import com.app.entities.Patient;
import com.app.entities.VaccinationCenter;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IAppointmentRepo;
import com.app.repo.IPatientRepo;
import com.app.repo.IVaccinationCenterRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AppointmentService implements IAppointmentService {

	@Autowired
	private IAppointmentRepo appointmentRepo;

	@Autowired
	private IPatientRepo patientRepo;

	@Autowired
	private IVaccinationCenterRepo centerRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<HomeVisitAppointmentDTO> getScheduledHomeVisitAppointments() {
		return appointmentRepo
				.findByAppointmentTypeAndAppointmentStatus(Appointment_Type.HOME_VISIT, Appointment_Status.SCHEDULED)
				.stream().map(appointment -> mapper.map(appointment, HomeVisitAppointmentDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse addAppointment(AppointmentDTO appointmentDTO) {
		// Fetching related entities
		Patient patient = patientRepo.findById(appointmentDTO.getPatientId())
				.orElseThrow(() -> new ResourceNotFoundException("Cannot Find Patient!"));

		VaccinationCenter center = centerRepo.findById(appointmentDTO.getVaccination_center_id())
				.orElseThrow(() -> new ResourceNotFoundException("Cannot Find Vaccination Center!"));

//	    Appointments appointment = mapper.map(appointmentDTO, Appointments.class);

		Appointments appointment = new Appointments();

		appointment.setBookedAppointmentDate(appointmentDTO.getBookedAppointmentDate());
		appointment.setAppointmentType(appointmentDTO.getAppointmentType());
		appointment.setAppointmentStatus(appointmentDTO.getAppointmentStatus());

		appointment.setPatient(patient);
		appointment.setVaccinationCenter(center);

		appointmentRepo.save(appointment);

		return new ApiResponse("Appointment Added Successfully!");
	}

}