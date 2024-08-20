package com.app.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.HealthStaff;

@Repository
public interface IHealthStaffRepo extends JpaRepository<HealthStaff, Long> {

	Optional<HealthStaff> findByEmailAndPassword(String email, String password);

	Optional<List<HealthStaff>> findByCenterId(Long centerId);

	Optional<HealthStaff> findByEmail(String email);
}
