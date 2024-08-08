package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ApiResponse;
import com.app.dto.DoctorDTO;
import com.app.dto.SpecializationDTO;
import com.app.entities.Doctor;
import com.app.entities.Specialization;
import com.app.exception.ResourceNotFoundException;
import com.app.repo.IDoctorRepo;
import com.app.repo.ISpecializationRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DoctorService implements IDoctorService {
	@Autowired
	IDoctorRepo doctorRepo;
	@Autowired
	ISpecializationRepo specializationRepo;
	@Autowired
	ModelMapper model;

	@Override
	public DoctorDTO addDoctorDetails(DoctorDTO doctor) {

		Doctor doctorEntity = model.map(doctor, Doctor.class);
		SpecializationDTO specializationDTO = doctor.getSpecializationDTO();
		Specialization specialization = model.map(specializationDTO, Specialization.class);
		doctorEntity.setSpecialization(specialization);

		Doctor savedDoctor = doctorRepo.save(doctorEntity);
		DoctorDTO savedDoctorDto = model.map(savedDoctor, DoctorDTO.class);

		// Convert Specialization entities to SpecializationDto
		Specialization specializations = savedDoctor.getSpecialization();
		SpecializationDTO specializationDTOs = model.map(specializations, SpecializationDTO.class);

		savedDoctorDto.setSpecializationDTO(specializationDTOs);

		return savedDoctorDto;
	}
	

	public ApiResponse updateDoctor(Long id,DoctorDTO doctorDTO) {
		Doctor doctorEntity = doctorRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Doctor details not found"));
		doctorEntity.setFirstName(doctorDTO.getFirstName());
		doctorEntity.setLastName(doctorDTO.getLastName());
		doctorEntity.setEmail(doctorDTO.getEmail());
		doctorEntity.setAadharCardNumber(doctorDTO.getAadharCardNumber());
		doctorEntity.setPhoneNumber(doctorDTO.getPhoneNumber());
		doctorEntity.setYearsOfExperience(doctorDTO.getYearsOfExperience());
		SpecializationDTO specializationDTO = doctorDTO.getSpecializationDTO();
		if(specializationDTO!=null)
		{	
			
			Specialization specialization = specializationRepo.findById(doctorEntity.getSpecialization().getSpecializationId()).orElseThrow(()-> new ResourceNotFoundException("specialization details not found"));
			specialization.setSpecializationName(specializationDTO.getSpecializationName());
		}
		
		
		return new ApiResponse("Doctor details updated successfully");
	}

	public ApiResponse deleteDoctor(Long id) {
		Doctor doctor = doctorRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Doctor details not found"));
		doctorRepo.delete(doctor);
		return new ApiResponse("Doctor details deleted successfully");
	}

}
