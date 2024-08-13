package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDTO;
import com.app.service.IAppointmentService;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

	
	@Autowired
	private IAppointmentService appointmentService;

	
	@PostMapping("/addAppointment")
	public ResponseEntity<?> addNewAppointmentByPatientId(@RequestBody AppointmentDTO appointmentDTO){
		return ResponseEntity.ok(appointmentService.addAppointment(appointmentDTO));
	}
		
}



