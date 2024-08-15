package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.HealthStaff;

@Repository
public interface IHealthStaffRepo extends JpaRepository<HealthStaff, Long> {

	Optional<HealthStaff> findByEmailAndPassword(String email, String password);

	@Query("SELECT s FROM HealthStaff s LEFT JOIN FETCH s.listOfAppointments WHERE s.email = :email")
	Optional<HealthStaff> getStaffWithAllAppointmentDetails(@Param("email") String email);

}
