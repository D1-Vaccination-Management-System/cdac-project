package com.app.service;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.entities.Admin;

public interface IAdminService {

	ApiResponse addAdminToCenter(Long centerId, AdminDTO adminDTO);

	Admin loginAdmin(String email, String password);

	Admin updateAdmin(String email, AdminDTO adminDTO);

	Admin assignVisitToHealthStaff(String email, AdminDTO adminDTO);
}
