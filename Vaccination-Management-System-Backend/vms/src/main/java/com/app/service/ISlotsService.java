package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.dto.SlotDTO;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;

public interface ISlotsService {

	List<Slots> getAvailableSlots(VaccinationCenter center, LocalDate date);

	List<String> getAllSlotValues();

	String addSlot(SlotDTO slotDTO);

	String incrementCapacity(Long vaccinationCenterId, String slotName, LocalDate date);

}
