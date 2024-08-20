package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.DoctorDTO;

public interface IDoctorService {
	DoctorDTO addDoctorDetails(DoctorDTO doctor);

	ApiResponse updateDoctor(Long id,DoctorDTO doctorDTO);

	ApiResponse deleteDoctor(Long id);
}
