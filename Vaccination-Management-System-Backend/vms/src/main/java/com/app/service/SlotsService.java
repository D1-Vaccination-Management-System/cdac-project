package com.app.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.SlotDTO;
import com.app.entities.AvailableSlots;
import com.app.entities.Patient;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IPatientRepo;
import com.app.repo.ISlotsRepo;

@Service
public class SlotsService implements ISlotsService {

	@Autowired
	private ISlotsRepo slotsRepository;

	@Autowired
	private IVaccinationCenterService vaccinationCenterService;

	@Autowired
	private IPatientRepo patientRepo;

	@Override
	public List<Slots> getAvailableSlots(VaccinationCenter center, LocalDate date) {
		return slotsRepository.findAvailableSlots(center, date);
	}

	@Override
	public List<String> getAllSlotValues() {
		// Get all enum values and convert them to a list of strings
		return Arrays.stream(AvailableSlots.values()).map(Enum::name).collect(Collectors.toList());
	}

	@Override
	public String incrementCapacity(Long vaccinationCenterId, String slotName, LocalDate date) {
		VaccinationCenter center = vaccinationCenterService.getCenterById(vaccinationCenterId);
		AvailableSlots slotEnum = AvailableSlots.valueOf(slotName);
		Slots slot = slotsRepository.findByVaccinationCenterAndSlotAndDate(center, slotEnum, date);

		if (slot != null) {
			slot.setCapacity(slot.getCapacity() + 1);
			slotsRepository.save(slot);
			return "Capacity incremented successfully";
		} else {
			return "Slot not found";
		}
	}

	@Override
	public String addSlot(SlotDTO slotDTO) {
		// Fetch the patient based on the provided ID
		Patient patient = patientRepo.findById(slotDTO.getPatientId())
				.orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

		// Fetch the center based on the provided ID
		VaccinationCenter center = vaccinationCenterService.getCenterById(slotDTO.getVaccinationCenterId());

		// Check if a slot with the same slot type, date, and patient already exists
		Slots existingSlot = slotsRepository.findBySlotAndDateAndPatientUserId(
				AvailableSlots.valueOf(slotDTO.getSlot()), slotDTO.getDate(), slotDTO.getPatientId());

		if (existingSlot != null) {
			// If slot exists, increment the capacity
			existingSlot.setCapacity(existingSlot.getCapacity() + 1);
			slotsRepository.save(existingSlot); // Save the updated slot
		} else {
			// If slot does not exist, create and save a new slot
			Slots newSlot = new Slots();
			newSlot.setSlot(AvailableSlots.valueOf(slotDTO.getSlot()));
			newSlot.setDate(slotDTO.getDate());
			newSlot.setCapacity(slotDTO.getCapacity());
			newSlot.setPatient(patient);
			newSlot.setVaccinationCenter(center);

			slotsRepository.save(newSlot);
		}

		return "Success";
	}
}
