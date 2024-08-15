package com.app.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.entities.Admin;
import com.app.entities.VaccinationCenter;
import com.app.enums.Role;
import com.app.exception.ApiException;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IAdminRepo;
import com.app.repo.IVaccinationCenterRepo;

@Service
public class AdminService implements IAdminService {

	@Autowired
	private IAdminRepo adminRepo;

	@Autowired
	private IVaccinationCenterRepo centerRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public Admin loginAdmin(String email, String password) {
		return adminRepo.findByEmailAndPassword(email, password)
				.orElseThrow(() -> new ApiException("Invalid email or password"));
	}

	@Override
	public ApiResponse addAdminToCenter(Long centerId, AdminDTO adminDTO) {
		// Retrieve the VaccinationCenter by centerId
		Optional<VaccinationCenter> optionalCenter = centerRepo.findById(centerId);
		if (!optionalCenter.isPresent())
			throw new RuntimeException("Vaccination Center not found with id: " + centerId);

		VaccinationCenter center = optionalCenter.get();
		Admin admin = mapper.map(adminDTO, Admin.class);
		if (admin.getUserId() != null)
			throw new IllegalArgumentException("AdminDTO should not have an ID when creating a new Admin");

		admin.setVaccinationCenter(center);
		admin.setRole(Role.ROLE_ADMIN);
		Admin savedAdmin = adminRepo.save(admin);
		center.setAdmin(savedAdmin);
		centerRepo.save(center);

		return new ApiResponse("Admin added successful");
	}

	@Override
	public Admin updateAdmin(String email, AdminDTO adminDTO) {

		Admin admin = adminRepo.findAdminByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Admin doesn't Exist"));
		admin.setFirstName(adminDTO.getFirstName());
		admin.setLastName(adminDTO.getLastName());
		admin.setEmail(adminDTO.getEmail());
		admin.setPassword(adminDTO.getPassword());
		admin.setPhoneNumber(adminDTO.getPhoneNumber());
		adminRepo.save(admin);

		return admin;

	}

	@Override
	public Admin assignVisitToHealthStaff(String email, AdminDTO adminDTO) {
		// TODO Auto-generated method stub
		return null;
	}

}
