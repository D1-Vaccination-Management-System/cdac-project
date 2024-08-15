package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.DoctorDTO;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.service.IDoctorService;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

	@Autowired
	private IDoctorService doctorService;

	@PostMapping("/add-doctor")
	public ResponseEntity<?> addDoctorDetails(@RequestBody DoctorDTO DoctorDTO) {
		try {
			DoctorDTO createdDoctor = doctorService.addDoctorDetails(DoctorDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdDoctor);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PutMapping("/update-doctor")
	public ResponseEntity<?> updateDoctor(@RequestParam Long id,  @RequestBody DoctorDTO DoctorDTO) {
		try {
			
			return ResponseEntity.ok(doctorService.updateDoctor(id,DoctorDTO));
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/delete-doctor/{id}")
	public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
		try {
			doctorService.deleteDoctor(id);
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Doctor details Deleted Successfully"));
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
}
