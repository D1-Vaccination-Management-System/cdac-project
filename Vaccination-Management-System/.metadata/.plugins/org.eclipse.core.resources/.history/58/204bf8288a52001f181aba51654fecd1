package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.SpecializationDTO;
import com.app.entities.Specialization;
import com.app.repo.ISpecializationRepo;


@Service
@Transactional
public class SpecializationService implements ISpecializationService
{
	@Autowired
	ISpecializationRepo specializationRepo;
	@Autowired
	ModelMapper modelMapper;
	
	
	@Override
	public SpecializationDTO addSpecialization(SpecializationDTO SpecializationDTO) {
		Specialization specializationEntity = modelMapper.map(SpecializationDTO, Specialization.class);
		Specialization savedSpecialization =  specializationRepo.save(specializationEntity);
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
