package com.app.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.AvailableSlots;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;
import com.app.repo.ISlotsRepo;

@Service
public class SlotsService implements ISlotsService {

	@Autowired
	private ISlotsRepo slotsRepository;

	@Override
	public List<Slots> getAvailableSlots(VaccinationCenter center, LocalDate date) {
		return slotsRepository.findAvailableSlots(center, date);
	}

	@Override
	public List<String> getAllSlotValues() {
		// Get all enum values and convert them to a list of strings
		return Arrays.stream(AvailableSlots.values()).map(Enum::name).collect(Collectors.toList());
	}
}
