package com.app.service;

import java.util.List;

import com.app.dto.AddressDTO;
import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.dto.AppointmentHistoryDTO;
import com.app.dto.PatientDTO;
import com.app.dto.UpdatePatientDTO;
import com.app.entities.Patient;

public interface IPatientService {
	Patient addPatientDetails(PatientDTO patient);

	Patient loginPatient(String email, String password);

	AddressDTO getAddressDetails(Long patientId, Long addressId);

	Patient updateAddress(Long patientId, Long addressId, AddressDTO addressDTO);

	List<AppointmentDTO> getAppointmentHistory(Long patientId);

	UpdatePatientDTO updatePatientDetails(Long patientId, UpdatePatientDTO patient);

	ApiResponse deletePatientDetails(Long patientId);

	List<AppointmentHistoryDTO> getAppointmentHisporyByPaientId(Long patientId);

	List<AppointmentHistoryDTO> getAppointmentUpcomingByPatientId(Long patientId);

}
