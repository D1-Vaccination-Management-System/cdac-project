package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Appointments;
import com.app.entities.Patient;

@Repository
public interface IAppointmentRepo extends JpaRepository<Appointments, Long> {
	List<Appointments> findAByStaff_userId(Long staffId);

	List<Appointments> findByPatient(Patient patient);
}
