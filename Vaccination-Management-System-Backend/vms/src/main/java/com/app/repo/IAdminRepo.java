package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Admin;

public interface IAdminRepo extends JpaRepository<Admin, Long> {
	
}
