package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.VaccineDTO;
import com.app.service.IVaccineService;

@RestController
@RequestMapping("/vaccines")
@CrossOrigin(origins = "http://localhost:5173")
public class VaccineController {

	@Autowired
	private IVaccineService vaccineService;

	@PostMapping("/add-vaccine/{centerId}")
	public ResponseEntity<?> addVaccine(@RequestBody VaccineDTO vaccine, @PathVariable Long centerId) {
		ResponseEntity.status(HttpStatus.CREATED).body(vaccineService.addVaccine(vaccine, centerId));
		return ResponseEntity.ok("Success");
	}

	@GetMapping("/available-vaccine/{centerId}")
	public ResponseEntity<?> allVaccinesByCenterId(@PathVariable Long centerId) {
		return ResponseEntity.ok(vaccineService.getAllVaccines(centerId));
	}

	@DeleteMapping("/delete-vaccine/{vaccineId}")
	public ResponseEntity<?> deleteVaccineByVaccineId(@PathVariable Long vaccineId) {
		return ResponseEntity.ok(vaccineService.deleteVaccineByVaccineId(vaccineId));
	}

}