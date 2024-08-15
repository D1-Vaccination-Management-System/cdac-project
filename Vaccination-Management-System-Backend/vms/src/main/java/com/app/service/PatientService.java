package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AddressDTO;
import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.dto.AppointmentHistoryDTO;
import com.app.dto.PatientDTO;
import com.app.dto.UpdatePatientDTO;
import com.app.entities.Address;
import com.app.entities.Appointment_Status;
import com.app.entities.Appointments;
import com.app.entities.Patient;
import com.app.enums.Role;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IAppointmentRepo;
import com.app.repo.IPatientRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PatientService implements IPatientService {

	@Autowired
	private IPatientRepo patientRepo;

	@Autowired
	private IAppointmentRepo appointmentRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public Patient addPatientDetails(PatientDTO patient) {
		patient.setRole(Role.ROLE_PATIENT);
		return patientRepo.save(mapper.map(patient, Patient.class));
	}

	@Override
	public Patient loginPatient(String email, String password) {
		return patientRepo.findByEmailAndPassword(email, password)
				.orElseThrow(() -> new ApiException("Invalid email or password"));
	}

	@Override
	public AddressDTO getAddressDetails(Long patientId, Long addressId) {
		Patient patient = patientRepo.findByUserIdAndAddress_AddressId(patientId, addressId)
				.orElseThrow(() -> new ApiException("Patient or address not found"));
		Address address = patient.getAddress();
		return new AddressDTO(address.getStreet(), address.getCity(), address.getState(), address.getZipCode());
	}

	@Override
	public Patient updateAddress(Long patientId, Long addressId, AddressDTO addressDTO) {
		Patient patient = patientRepo.findByUserIdAndAddress_AddressId(patientId, addressId)
				.orElseThrow(() -> new ApiException("Patient or address not found"));
		Address address = patient.getAddress();
		address.setStreet(addressDTO.getStreet());
		address.setCity(addressDTO.getCity());
		address.setState(addressDTO.getState());
		address.setZipCode(addressDTO.getZipCode());
		return patientRepo.save(patient);
	}

	@Override
	public List<AppointmentDTO> getAppointmentHistory(Long patientId) {
		List<AppointmentDTO> patientWithAllItsAppointments = patientRepo.getPatientWithAllAppointmentDetails(patientId);
		return patientWithAllItsAppointments;
	}

	@Override
	public UpdatePatientDTO updatePatientDetails(Long patientId, UpdatePatientDTO patient) {
		Patient patientEntity = patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient details not found.."));
		patientEntity.setFirstName(patient.getFirstName());
		patientEntity.setLastName(patient.getLastName());
		patientEntity.setEmail(patient.getEmail());
		patientEntity.setAadharCardNumber(patient.getAadharCardNumber());
		patientEntity.setPhoneNumber(patient.getPhoneNumber());
		return mapper.map(patientEntity, UpdatePatientDTO.class);
	}

	@Override
	public ApiResponse deletePatientDetails(Long patientId) {
		if (patientRepo.existsById(patientId)) {
			patientRepo.deleteById(patientId);
			return new ApiResponse("Profile deleted success fully...");
		} else
			return new ApiResponse("Patient details not found...");

	}

	@Override
	public List<AppointmentHistoryDTO> getAppointmentHisporyByPaientId(Long patientId) {
		Patient patient = patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

		List<Appointments> app = appointmentRepo.findByPatient(patient);

		List<Appointments> filteredAppointments = app.stream()
				.filter(appointment -> appointment.getAppointmentStatus() == Appointment_Status.COMPLETED
						|| appointment.getAppointmentStatus() == Appointment_Status.CANCELED)
				.collect(Collectors.toList());

		if (!filteredAppointments.isEmpty()) {

			List<AppointmentHistoryDTO> history = filteredAppointments.stream()
					.map(a -> mapper.map(a, AppointmentHistoryDTO.class)).collect(Collectors.toList());
			return history;
		} else
			throw new ResourceNotFoundException("Failed to fetch appointments");

	}

	@Override
	public List<AppointmentHistoryDTO> getAppointmentUpcomingByPatientId(Long patientId) {
		Patient patient = patientRepo.findById(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

		List<Appointments> app = appointmentRepo.findByPatient(patient);

		List<Appointments> filteredAppointments = app.stream()
				.filter(appointment -> appointment.getAppointmentStatus() == Appointment_Status.PENDING
						|| appointment.getAppointmentStatus() == Appointment_Status.SCHEDULED
						|| appointment.getAppointmentStatus() == Appointment_Status.RESCHEDULED)
				.collect(Collectors.toList());

		if (!filteredAppointments.isEmpty()) {

			List<AppointmentHistoryDTO> upcoming = filteredAppointments.stream()
					.map(a -> mapper.map(a, AppointmentHistoryDTO.class)).collect(Collectors.toList());
			return upcoming;
		} else
			throw new ResourceNotFoundException("Failed to fetch appointments");

	}

}
