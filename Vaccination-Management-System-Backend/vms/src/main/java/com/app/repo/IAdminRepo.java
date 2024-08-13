package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Admin;

public interface IAdminRepo extends JpaRepository<Admin, Long> {
	
	Optional<Admin> findByEmailAndPassword(String email, String password);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<Admin> findAdminByEmail(String email);
}
