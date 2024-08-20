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

import com.app.dto.VaccinationCenterDTO;
import com.app.dto.VaccinationCenterSearchDTO;
import com.app.service.IVaccinationCenterService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/vaccination-center")
public class VaccinationController {

	@Autowired
	private IVaccinationCenterService vaccinationCenterService;

	@GetMapping("/centers-by-pincode")
	public List<VaccinationCenterSearchDTO> getCenterByZipCode(@RequestParam String pincode){
		return vaccinationCenterService.getCenterByZipCode(pincode);
	}
	
	@GetMapping("/centers-by-address")
	public List<VaccinationCenterSearchDTO> getCentersByLocation(@RequestParam String city, @RequestParam String state) {
		return vaccinationCenterService.getCentersByCityAndState(city, state);
	}

	@PostMapping("/add-center")
	public ResponseEntity<?> addvaccinationCenter(@RequestBody @Valid VaccinationCenterDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(vaccinationCenterService.addVaccinationCenter(dto));
	}

	@PutMapping("/update-center-info/{id}")
	public ResponseEntity<?> updateVaccinationCenter(@PathVariable Long id, @RequestBody VaccinationCenterDTO dto) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.updateVaccinationCenter(id, dto));
	}

	@GetMapping("/get-center-details/{id}")
	public ResponseEntity<?> getVaccinationCenter(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.getAllDetails(id));
	}

	@DeleteMapping("/delete-center/{id}")
	public ResponseEntity<?> deleteVaccinationCenter(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.deleteVaccinationCenter(id));
	}

	@GetMapping("/get-all-appointments")
	public ResponseEntity<?> getAllAppointments(@RequestParam Long centerId) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.getAllAppointments(centerId));
	}
}
