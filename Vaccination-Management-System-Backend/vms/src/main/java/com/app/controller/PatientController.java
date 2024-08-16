package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddressDTO;
import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDTO;
import com.app.dto.LoginDTO;
import com.app.dto.PatientDTO;
import com.app.dto.UpdatePatientDTO;
import com.app.entities.Patient;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.service.IPatientService;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

	@Autowired
	private IPatientService patientService;

	@PostMapping("/register-user")
	public ResponseEntity<?> addPatientDetails(@RequestBody PatientDTO patient) {
		return ResponseEntity.status(HttpStatus.CREATED).body(patientService.addPatientDetails(patient));
	}

	@PostMapping("/login-user")
	public ResponseEntity<?> loginPatientUsingEmailAndPass(@RequestBody LoginDTO login) {
		try {
			Patient patient = patientService.loginPatient(login.getEmail(), login.getPassword());
			return ResponseEntity.status(HttpStatus.OK).body(patient);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/patient-address")
	public ResponseEntity<?> getAddressDetails(@RequestParam Long patientId, @RequestParam Long addressId) {
		try {
			AddressDTO address = patientService.getAddressDetails(patientId, addressId);
			return ResponseEntity.status(HttpStatus.OK).body(address);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@PutMapping("/update-address")
	public ResponseEntity<?> updateAddress(@RequestParam Long patientId, @RequestParam Long addressId,
			@RequestBody AddressDTO addressDTO) {
		try {
			Patient updatedPatient = patientService.updateAddress(patientId, addressId, addressDTO);
			return ResponseEntity.status(HttpStatus.OK).body(updatedPatient);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/appointment-history/{patientId}")
	public ResponseEntity<?> getAppointmentHistory(@PathVariable Long patientId) {
		List<AppointmentDTO> appointments = patientService.getAppointmentHistory(patientId);
		return ResponseEntity.ok(appointments);
	}

	@PutMapping("/update-user")
	public ResponseEntity<?> updatePatientDetails(@RequestParam Long id, @RequestBody UpdatePatientDTO patient) {
		try {
			UpdatePatientDTO updatedPatient = patientService.updatePatientDetails(id, patient);
			return ResponseEntity.status(HttpStatus.OK).body(updatedPatient);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/delete-user")
	public ResponseEntity<?> deletePatientDetails(@RequestParam Long id) {
		try {
			patientService.deletePatientDetails(id);
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Profile Deleted Successfully.."));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}

	}
	
	@GetMapping("/get-patient-appointment-history")
	public ResponseEntity<?> getPatientAppointmentHistory(@RequestParam Long patientId) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(patientService.getAppointmentHisporyByPaientId(patientId));
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/get-patient-appointment-upcoming")
	public ResponseEntity<?> getPatientAppointmentUpcoming(@RequestParam Long patientId) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(patientService.getAppointmentUpcomingByPatientId(patientId));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

}
