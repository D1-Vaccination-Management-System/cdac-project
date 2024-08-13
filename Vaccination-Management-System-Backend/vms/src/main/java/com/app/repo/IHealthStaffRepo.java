package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.HealthStaff;

public interface IHealthStaffRepo extends JpaRepository<HealthStaff, Long>{
		
	Optional<HealthStaff> findByEmailAndPassword(String email, String password);

}
