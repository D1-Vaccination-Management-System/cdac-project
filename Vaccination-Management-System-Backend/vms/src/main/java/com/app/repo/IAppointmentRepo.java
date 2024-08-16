package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Appointment_Status;
import com.app.entities.Appointment_Type;
import com.app.entities.Appointments;
import com.app.entities.Patient;

@Repository
public interface IAppointmentRepo extends JpaRepository<Appointments, Long> {

	// Custom query method to find all appointments with HOME_VISIT type and
	// SCHEDULED status
	List<Appointments> findByAppointmentTypeAndAppointmentStatus(Appointment_Type appointmentType,
			Appointment_Status appointmentStatus);

	List<Appointments> findAByStaff_userId(Long staffId);

	List<Appointments> findByPatient(Patient patient);
}
