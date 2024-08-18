package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.VaccinationCenter;
import com.app.entities.Vaccines;

public interface IVaccineRepo extends JpaRepository<Vaccines, Long> {

	@Query("SELECT v FROM Vaccines v WHERE v.vaccinationCenter.centerId = :centerId")
	List<Vaccines> findByVaccinationCenterId(@Param("centerId") Long centerId);

	Vaccines findByVaccineNameAndVaccinationCenter(String vaccineName, VaccinationCenter vaccinationCenter);
}