package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Patient;

public interface IPatientRepo extends JpaRepository<Patient, Long> {
	Optional<Patient> findByPatientIdAndAddress_AddressId(Long patientId, Long addressId);

	Optional<Patient> findByEmailAndPassword(String email, String password);
}
