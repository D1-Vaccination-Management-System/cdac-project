package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.VaccinationCenterDTO;
import com.app.service.IVaccinationCenterService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/vaccination_center")
public class VaccinationController {

	@Autowired
	private IVaccinationCenterService vaccinationCenterService;

	@PostMapping("/add-center")
	@Operation(description = "Add Vaccination Center")
	public ResponseEntity<?> addvaccinationCenter(@RequestBody @Valid VaccinationCenterDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(vaccinationCenterService.addVaccinationCenter(dto));
	}

	@PutMapping("/update-center-info/{id}")
	@Operation(description = "Update Vaccination Center")
	public ResponseEntity<?> updateVaccinationCenter(@PathVariable Long id, @RequestBody VaccinationCenterDTO dto) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.updateVaccinationCenter(id, dto));
	}

	@GetMapping("/get-center-details/{id}")
	@Operation(description = "Get vaccination Center Details")
	public ResponseEntity<?> getVaccinationCenter(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.getAllDetails(id));
	}
	@DeleteMapping("/delete-center/{id}")
	@Operation(description = "Get vaccination Center Details")
	public ResponseEntity<?> deleteVaccinationCenter(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(vaccinationCenterService.deleteVaccinationCenter(id));
	}
}
