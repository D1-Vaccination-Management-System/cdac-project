package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.SpecializationDTO;
import com.app.entities.Specialization;
import com.app.repo.ISpecializationRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SpecializationService implements ISpecializationService {
	@Autowired
	ISpecializationRepo specializationRepo;
	@Autowired
	ModelMapper modelMapper;

	@Override
	public SpecializationDTO addSpecialization(SpecializationDTO specializationDTO) {
		Specialization specializationEntity = modelMapper.map(specializationDTO, Specialization.class);
		Specialization savedSpecialization = specializationRepo.save(specializationEntity);
		return modelMapper.map(savedSpecialization, SpecializationDTO.class);
	}

	@Override
	public List<SpecializationDTO> getAllspecialization() {
		// TODO Auto-generated method stub
		List<Specialization> sList = specializationRepo.findAll();
		List<SpecializationDTO> sListDto = sList.stream()
				.map(specialization -> modelMapper.map(specialization, SpecializationDTO.class))
				.collect(Collectors.toList());
		return sListDto;
	}

}
