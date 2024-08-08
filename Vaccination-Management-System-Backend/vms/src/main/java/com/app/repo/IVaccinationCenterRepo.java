package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.VaccinationCenter;

@Repository
public interface IVaccinationCenterRepo extends JpaRepository<VaccinationCenter, Long> {
	boolean existsByCenterName(String name);
}
