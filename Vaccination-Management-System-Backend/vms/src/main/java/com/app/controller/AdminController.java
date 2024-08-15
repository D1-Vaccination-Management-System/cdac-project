package com.app.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.dto.LoginDTO;
import com.app.entities.Admin;
import com.app.exception.ApiException;
import com.app.service.IAdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

	@Autowired
	private IAdminService adminService;

	@Autowired
	private ModelMapper mapper;

	@PostMapping("/add-admin/{centerId}")
	public ResponseEntity<?> addAdminForCenter(@PathVariable Long centerId, @RequestBody AdminDTO adminDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addAdminToCenter(centerId, adminDTO));
	}

	@PostMapping("/login-user")
	public ResponseEntity<?> loginAdminUsingEmailAndPass(@RequestBody LoginDTO login) {
		try {
			Admin admin = adminService.loginAdmin(login.getEmail(), login.getPassword());
			System.out.println(admin.toString());
			AdminDTO adminDTO = mapper.map(admin, AdminDTO.class);
			System.out.println(adminDTO.toString());
			return ResponseEntity.status(HttpStatus.OK).body(adminDTO);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@PutMapping("/update-admin")
	public ResponseEntity<?> updateAdmin(@RequestParam String email, @RequestBody AdminDTO adminDTO) {
		try {
			Admin updatedAdmin = adminService.updateAdmin(email, adminDTO);
			return ResponseEntity.status(HttpStatus.OK).body(updatedAdmin);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@PutMapping("/assign-visit-to-health-staff")
	public ResponseEntity<?> assignVisitToHealthStaff(@RequestParam String email, @RequestBody AdminDTO adminDTO) {
		try {
			Admin updatedAdmin = adminService.assignVisitToHealthStaff(email, adminDTO);
			return ResponseEntity.status(HttpStatus.OK).body(updatedAdmin);
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

}
