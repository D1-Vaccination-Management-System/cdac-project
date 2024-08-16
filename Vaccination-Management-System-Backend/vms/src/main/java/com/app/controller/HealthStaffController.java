package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.HealthStaffDTO;
import com.app.dto.LoginDTO;
import com.app.service.IHealthStaffService;

@RestController
@RequestMapping("/health-staff")
@CrossOrigin(origins = "http://localhost:5173")
public class HealthStaffController {

	@Autowired
	private IHealthStaffService healthStaffService;

	@PostMapping("/incrementAppointments/{id}")
	public ResponseEntity<?> incrementAppointments(@PathVariable("id") Long id) {
		healthStaffService.incrementNoOfAppointments(id);
		return ResponseEntity.ok("Success");
	}

	@PostMapping("/add-health-staff")
	public ResponseEntity<?> addHealthStaff(@RequestBody HealthStaffDTO healthStaffDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(healthStaffService.addHealthStaff(healthStaffDTO));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginHealthStaff(@RequestBody LoginDTO healthStaffLoginDTO) {
		return ResponseEntity.ok(healthStaffService.loginHealthStaff(healthStaffLoginDTO));
	}

	@GetMapping("/get-all-appointments-by-staff-id/{staffId}")
	public ResponseEntity<?> getAllAppointments(@PathVariable Long staffId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(healthStaffService.getAllAppointmentsByStaffId(staffId));
	}

	@GetMapping("get-all-staff-by-center-id/{centerId}")
	public ResponseEntity<?> getAllStaffByCenterId(@PathVariable Long centerId) {
		return ResponseEntity.ok(healthStaffService.getAllStaffByCenterId(centerId));
	}

}
