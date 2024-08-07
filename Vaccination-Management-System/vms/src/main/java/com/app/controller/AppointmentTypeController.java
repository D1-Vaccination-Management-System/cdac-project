package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentTypeDTO;
import com.app.dto.AppointmentTypeUpdateDTO;
import com.app.service.AppointmentTypeService;


@RestController
@RequestMapping("/appointment-type")
public class AppointmentTypeController {
	
	
	@Autowired
	private AppointmentTypeService appointmentTypeService;
	
	
	@PostMapping("/add-appointment-type")
	public ResponseEntity<?> addAppointmentType(@RequestBody AppointmentTypeDTO appointmentTypeDTO){
		return ResponseEntity.ok(appointmentTypeService.addAppointmentType(appointmentTypeDTO));
//		return ResponseEntity.status(HttpStatus.CREATED).body(appointmentTypeService.addAppointmentType(appointmentTypeDTO));

	}
	
	@PutMapping("/update-appointment-type")
	public ResponseEntity<?> updateAppointmentType(@RequestBody AppointmentTypeUpdateDTO appointmentTypeUpdateDTO){
		return ResponseEntity.ok(appointmentTypeService.updateAppointmentType(appointmentTypeUpdateDTO));
//		return ResponseEntity.status(HttpStatus.CREATED).body(appointmentTypeService.addAppointmentType(appointmentTypeDTO));
	}
	
}
