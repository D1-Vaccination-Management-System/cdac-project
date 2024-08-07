package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Appointments;

@Repository
public interface IAppointmentRepo extends JpaRepository<Appointments, Long> {
	
}
