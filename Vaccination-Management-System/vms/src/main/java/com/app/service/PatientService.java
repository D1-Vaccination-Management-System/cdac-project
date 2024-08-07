package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AddressDTO;
import com.app.dto.PatientDTO;
import com.app.entities.Address;
import com.app.entities.Patient;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IPatientRepo;

@Service
@Transactional
public class PatientService implements IPatientService {

	@Autowired
	private IPatientRepo patientRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public Patient addPatientDetails(PatientDTO patient) {
		return patientRepo.save(mapper.map(patient, Patient.class));
	}

	@Override
	public Patient loginPatient(String email, String password) {
		return patientRepo.findByEmailAndPassword(email, password)
				.orElseThrow(() -> new ApiException("Invalid email or password"));
	}

	@Override
	public AddressDTO getAddressDetails(Long patientId, Long addressId) {
		Patient patient = patientRepo.findByPatientIdAndAddress_AddressId(patientId, addressId)
				.orElseThrow(() -> new ApiException("Patient or address not found"));
		Address address = patient.getAddress();
		return new AddressDTO(address.getStreet(), address.getCity(), address.getState(), address.getZipCode());
	}

	@Override
	public Patient updateAddress(Long patientId, Long addressId, AddressDTO addressDTO) {
		Patient patient = patientRepo.findByPatientIdAndAddress_AddressId(patientId, addressId)
				.orElseThrow(() -> new ApiException("Patient or address not found"));
		Address address = patient.getAddress();
		address.setStreet(addressDTO.getStreet());
		address.setCity(addressDTO.getCity());
		address.setState(addressDTO.getState());
		address.setZipCode(addressDTO.getZipCode());
		return patientRepo.save(patient);
	}
	@Override
	public Patient getPatientWithAllAppointments(Long patientId) {
		Patient patientWithAllItsAppointments = patientRepo.getPatientWithAllAppointmentDetails(patientId)
				.orElseThrow(() -> new ResourceNotFoundException("No Patient Found!"));
		return patientWithAllItsAppointments;
	}

}
