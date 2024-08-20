package com.app.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.AvailableSlots;
import com.app.entities.Slots;
import com.app.entities.VaccinationCenter;

public interface ISlotsRepo extends JpaRepository<Slots, Long> {
	@Query("SELECT s FROM Slots s WHERE s.vaccinationCenter = :center AND s.date = :Date AND s.capacity < 6")
	List<Slots> findAvailableSlots(@Param("center") VaccinationCenter center, @Param("Date") LocalDate endDate);

	@Query("SELECT s FROM Slots s WHERE s.vaccinationCenter = :center AND s.slot = :slot AND s.date = :date")
	Slots findByVaccinationCenterAndSlotAndDate(@Param("center") VaccinationCenter center,
			@Param("slot") AvailableSlots slot, @Param("date") LocalDate date);

	  Slots findBySlotAndDateAndPatientUserId(AvailableSlots slot, LocalDate date, Long patientId);

}
