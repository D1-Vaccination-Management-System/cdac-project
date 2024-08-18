package com.app.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vaccines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vaccines extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "vaccine_id", nullable = false)
	private Long vaccineId;

	@Column(name = "vaccine_name", nullable = false)
	private String vaccineName;

	@Column(nullable = false)
	private String description;

	@Column(name = "age_group", nullable = false)
	private String ageGroup;

	@CreationTimestamp
	@Column(name = "date_added")
	private LocalDate dateAdded;

	@ManyToOne
	@JoinColumn(name = "center_id", nullable = false)
	private VaccinationCenter vaccinationCenter;

	@Column(nullable = false)
	private int capacity;

}