package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;

public interface ISlotsService {

	List<Slots> getAvailableSlots(VaccinationCenter center, LocalDate date);

	public List<String> getAllSlotValues();
}
