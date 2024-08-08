package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Address;

public interface IAddressRepo extends JpaRepository<Address, Long> {

}
