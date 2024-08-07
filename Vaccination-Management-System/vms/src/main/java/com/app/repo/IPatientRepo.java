package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Patient;

public interface IPatientRepo extends JpaRepository<Patient, Long> {
	Optional<Patient> findByPatientIdAndAddress_AddressId(Long patientId, Long addressId);

	Optional<Patient> findByEmailAndPassword(String email, String password);
	
	@Query("SELECT p FROM Patient p LEFT JOIN FETCH p.appointments WHERE p.patientId = :patientId")
	Optional<Patient> getPatientWithAllAppointmentDetails(@Param("patientId") Long patientId);
}
