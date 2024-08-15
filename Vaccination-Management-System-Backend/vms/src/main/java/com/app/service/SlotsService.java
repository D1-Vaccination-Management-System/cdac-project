package com.app.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.SlotDTO;
import com.app.entities.AvailableSlots;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;
import com.app.repo.ISlotsRepo;

@Service
public class SlotsService implements ISlotsService {

	@Autowired
	private ISlotsRepo slotsRepository;

	@Autowired
	private IVaccinationCenterService vaccinationCenterService;

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
		Slots slot = new Slots();
		slot.setSlot(AvailableSlots.valueOf(slotDTO.getSlot()));
		slot.setDate(slotDTO.getDate());
		slot.setCapacity(slotDTO.getCapacity());

		VaccinationCenter center = vaccinationCenterService.getCenterById(slotDTO.getVaccinationCenterId());
		slot.setVaccinationCenter(center);

		slotsRepository.save(slot);
		return "Success";
	}
}
