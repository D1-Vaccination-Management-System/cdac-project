package com.app.entities;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class Slots extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long slotId;

	@Enumerated(EnumType.STRING)
	private AvailableSlots slot;

	private LocalDate date;

	private int capacity;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
	private Patient patient;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "vaccination_center_id")
	private VaccinationCenter vaccinationCenter;
}
