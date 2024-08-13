package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.VaccinationCenter;

@Repository
public interface IVaccinationCenterRepo extends JpaRepository<VaccinationCenter, Long> {

	boolean existsByCenterName(String name);

	List<VaccinationCenter> findByAddress_CityAndAddress_State(String city, String state);
	
	List<VaccinationCenter> findByAddress_ZipCode(String pinCode);
	
}
