package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.dto.AppointmentDetailsDTO;
import com.app.entities.Appointment_Status;
import com.app.entities.Appointment_Type;
import com.app.entities.Appointments;
import com.app.entities.Patient;
import com.app.entities.VaccinationCenter;

@Repository
public interface IAppointmentRepo extends JpaRepository<Appointments, Long> {

	List<Appointments> findByAppointmentTypeAndAppointmentStatusAndVaccinationCenter(Appointment_Type appointmentType,
			Appointment_Status appointmentStatus, VaccinationCenter vaccinationCenter);

	List<Appointments> findAByStaff_userId(Long staffId);

	List<Appointments> findByPatient(Patient patient);

	Appointments findByAppointmentId(Long appointmentId);
	
	@Query("SELECT new com.app.dto.AppointmentDetailsDTO(ap.appointmentId, p.firstName, a.street, a.city, a.state, a.zipCode, vc.centerName, ap.bookedAppointmentDate) "
			+ "FROM Appointments ap " + "JOIN ap.patient p " + "JOIN p.address a " + "JOIN ap.vaccinationCenter vc "
			+ "WHERE ap.staff.userId = :staffId")
	List<AppointmentDetailsDTO> getAllAppointmentsByStaffId(@Param("staffId") Long staffId);

	@Query("SELECT new com.app.dto.AppointmentDetailsDTO(ap.appointmentId, p.firstName, a.street, a.city, a.state, a.zipCode, vc.centerName, ap.bookedAppointmentDate) "
			+ "FROM Appointments ap " + "JOIN ap.patient p " + "JOIN p.address a " + "JOIN ap.vaccinationCenter vc "
			+ "WHERE ap.staff.userId = :staffId AND vc.centerId = ap.staff.centerId AND ap.vaccine IS NULL")
	List<AppointmentDetailsDTO> findAppointmentsWithNullVaccine(@Param("staffId") Long staffId);
}
