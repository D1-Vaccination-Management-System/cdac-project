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
	

	@PostMapping("/add-health-staff")
	public ResponseEntity<?> addHealthStaff(@RequestBody HealthStaffDTO healthStaffDTO){
		return ResponseEntity.ok(healthStaffService.addHealthStaff(healthStaffDTO));
	}
	

	@PostMapping("/login")
	public ResponseEntity<?> loginHealthStaff(@RequestBody LoginDTO healthStaffLoginDTO){
		return ResponseEntity.ok(healthStaffService.loginHealthStaff(healthStaffLoginDTO));
	}
	
	
	@GetMapping("/get-health-staff-with-appointments/{email}")
	public ResponseEntity<?> getPatientWithAllAppointments(@PathVariable String email) {
		return ResponseEntity.status(HttpStatus.CREATED).body(healthStaffService.getHealthStaffWithAllItsAppointments(email));
	}


	
}
