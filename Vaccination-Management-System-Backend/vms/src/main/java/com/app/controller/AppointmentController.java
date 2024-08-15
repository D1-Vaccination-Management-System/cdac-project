package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDTO;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;
import com.app.service.IAppointmentService;
import com.app.service.ISlotsService;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

	@Autowired
	private IAppointmentService appointmentService;

	@Autowired
	private ISlotsService slotsService;

	@GetMapping("/slots")
	public ResponseEntity<List<Slots>> getAvailableSlots(@RequestParam Long centerId, LocalDate endDate) {

		VaccinationCenter center = new VaccinationCenter(); // Retrieve from database by centerId
		center.setCenterId(centerId);

		List<Slots> slots = slotsService.getAvailableSlots(center, endDate);
		return ResponseEntity.ok(slots);
	}

	@PostMapping("/schedule")
	public ResponseEntity<String> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO) {
		appointmentService.addAppointment(appointmentDTO);
		return ResponseEntity.ok("Success");
	}

}
