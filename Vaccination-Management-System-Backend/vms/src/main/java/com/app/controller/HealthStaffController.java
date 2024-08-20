package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDetailsDTO;
import com.app.dto.HealthStaffDTO;
import com.app.dto.HealthStaffUpdateDTO;
import com.app.dto.LoginDTO;
import com.app.dto.StaffandAppointmentIdDTO;
import com.app.service.IHealthStaffService;

@RestController
@RequestMapping("/health-staff")
@CrossOrigin(origins = "http://localhost:5173")
public class HealthStaffController {

	@Autowired
	private IHealthStaffService healthStaffService;

	@PostMapping("/add-health-staff")
	public ResponseEntity<?> addHealthStaff(@RequestBody HealthStaffDTO healthStaffDTO) {
		return ResponseEntity.ok(healthStaffService.addHealthStaff(healthStaffDTO));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginHealthStaff(@RequestBody LoginDTO healthStaffLoginDTO) {
		return ResponseEntity.ok(healthStaffService.loginHealthStaff(healthStaffLoginDTO));
	}

	@GetMapping("/get-all-appointments-by-staff-id/{staffId}")
	public ResponseEntity<?> getAllAppointments(@PathVariable Long staffId) {
		List<AppointmentDetailsDTO> appointments = healthStaffService.getAllAppointmentsByStaffId(staffId);
		return ResponseEntity.status(HttpStatus.OK).body(appointments);
	}

	@GetMapping("get-all-staff-by-center-id/{centerId}")
	public ResponseEntity<?> getAllStaffByCenterId(@PathVariable Long centerId) {
		return ResponseEntity.ok(healthStaffService.getAllStaffByCenterId(centerId));
	}

	@PostMapping("/update-health-staff")
	public ResponseEntity<?> updateHealthStaff(@RequestParam String email,
			@RequestBody HealthStaffUpdateDTO healthStaffUpdateDTO) {
		return ResponseEntity.ok(healthStaffService.updateHealthStaff(email, healthStaffUpdateDTO));
	}
	
	@PostMapping("/incrementAppointments")
	public ResponseEntity<?> incrementAppointments(@RequestBody StaffandAppointmentIdDTO dto ) {
		return ResponseEntity.ok(healthStaffService.increaseAppointment(dto));
	}
	
	@GetMapping("/get-all-appointment-by-staff-id-null-vaccines/{staffId}")
	public ResponseEntity<?> getAppointmentswithNullvaccines(@PathVariable Long staffId) {
		return ResponseEntity.ok(healthStaffService.getAppointmentsWithNullVaccines(staffId));
	} 
}
