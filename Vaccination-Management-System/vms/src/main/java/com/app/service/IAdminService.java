package com.app.service;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;

public interface IAdminService {

	ApiResponse addAdminToCenter(Long centerId, AdminDTO adminDTO);

}
