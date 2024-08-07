package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.DoctorDTO;
import com.app.dto.SpecializationDTO;
import com.app.entities.Doctor;
import com.app.entities.Specialization;
import com.app.exception.ApiException;
import com.app.repo.IDoctorRepo;

@Service
@Transactional
public class DoctorService implements IDoctorService {
	@Autowired
	private IDoctorRepo doctorRepo;
	@Autowired
	private ModelMapper mapper;

	@Override
	public Doctor addDoctorDetails(DoctorDTO DoctorDTO) {
		if (DoctorDTO.getSpecializationDTO() == null) {
			throw new ApiException("Specialization cannot be null");
		}
		Doctor doctor = mapper.map(DoctorDTO, Doctor.class);
		SpecializationDTO SpecializationDTO = DoctorDTO.getSpecializationDTO();
		Specialization specialization = mapper.map(SpecializationDTO, Specialization.class);
		doctor.setSpecialization(specialization);
		return doctorRepo.save(doctor);
	}

	public void deleteDoctor(Long id) {
		if (!doctorRepo.existsById(id)) {
			throw new ApiException("Doctor with id " + id + " not found");
		}
		doctorRepo.deleteById(id);
	}

	public DoctorDTO updateDoctor( DoctorDTO DoctorDTO) {
        if (!doctorRepo.existsById(DoctorDTO.getDoctorId())) {
            return null; 
        }

        Doctor doctor = mapper.map(DoctorDTO, Doctor.class);

        SpecializationDTO SpecializationDTO = DoctorDTO.getSpecializationDTO();
		Specialization specialization = mapper.map(SpecializationDTO, Specialization.class);

        doctor.setSpecialization(specialization);

        Doctor updatedDoctor = doctorRepo.save(doctor);

        DoctorDTO updatedDoctorDTO = mapper.map(updatedDoctor, DoctorDTO.class);

        Specialization specializations = updatedDoctor.getSpecialization();
        SpecializationDTO SpecializationDTOs = mapper.map(specializations, SpecializationDTO.class);

        updatedDoctorDTO.setSpecializationDTO(SpecializationDTOs);

        return updatedDoctorDTO;
    }
}
