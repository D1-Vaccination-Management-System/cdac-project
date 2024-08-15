package com.app.controller;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SlotDTO;
import com.app.entities.AvailableSlots;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;
import com.app.service.ISlotsService;
import com.app.service.IVaccinationCenterService;

@RestController
@RequestMapping("/slots")
@CrossOrigin(origins = "http://localhost:5173")
public class SlotsController {
	@Autowired
	private ISlotsService slotsService;

	@Autowired
	private IVaccinationCenterService vaccinationCenterService;

	@GetMapping("/available")
	public ResponseEntity<List<Slots>> getAvailableSlots(@RequestParam Long centerId, @RequestParam LocalDate date) {
		VaccinationCenter center = vaccinationCenterService.getCenterById(centerId);
		List<Slots> slots = slotsService.getAvailableSlots(center, date);

		if (slots.isEmpty()) {
			// No slots available for the selected center, get all slots from enum API
			List<String> allSlots = slotsService.getAllSlotValues(); // Fetch all slots from enum
			return ResponseEntity.ok(allSlots.stream().map(slot -> {
				Slots s = new Slots();
				s.setSlot(AvailableSlots.valueOf(slot));
				s.setDate(date);
				s.setCapacity(0); // or some default value
				return s;
			}).collect(Collectors.toList()));
		} else {
			// Filter slots based on capacity
			List<Slots> filteredSlots = slots.stream().filter(slot -> slot.getCapacity() < 6)
					.collect(Collectors.toList());
			return ResponseEntity.ok(filteredSlots);
		}
	}

	@GetMapping("/all")
	public List<String> getAllSlots() {
		// Get all enum values and convert them to a list of strings
		return Arrays.stream(AvailableSlots.values()).map(Enum::name).collect(Collectors.toList());
	}

	@PostMapping("/add")
	public ResponseEntity<String> addSlot(@RequestBody SlotDTO slotDTO) {
		String response = slotsService.addSlot(slotDTO);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/increment-capacity")
	public ResponseEntity<String> incrementCapacity(@RequestParam Long vaccinationCenterId,
			@RequestParam String slotName, @RequestParam LocalDate date) {
		String response = slotsService.incrementCapacity(vaccinationCenterId, slotName, date);
		return ResponseEntity.ok(response);
	}

}
