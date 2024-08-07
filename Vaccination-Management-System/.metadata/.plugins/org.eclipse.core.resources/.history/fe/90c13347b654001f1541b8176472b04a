package com.app.service;

import com.app.dto.PatientDTO;
import com.app.dto.AddressDTO;
import com.app.entities.Patient;

public interface IPatientService {
	Patient addPatientDetails(PatientDTO patient);

	Patient loginPatient(String email, String password);

	AddressDTO getAddressDetails(Long patientId, Long addressId);

	Patient updateAddress(Long patientId, Long addressId, AddressDTO addressDTO);
}
