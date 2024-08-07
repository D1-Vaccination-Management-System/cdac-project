package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AdminDTO;
import com.app.service.IAdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private IAdminService adminService;

	@PostMapping("/add-admin/{centerId}")
	public ResponseEntity<?> addAdminForCenter(@PathVariable Long centerId, @RequestBody AdminDTO adminDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addAdminToCenter(centerId, adminDTO));
	}

}
