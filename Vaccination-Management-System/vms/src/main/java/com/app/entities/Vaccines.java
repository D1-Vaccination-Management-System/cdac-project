package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

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
	@JoinColumn(name = "centerId", nullable = false)
	private VaccinationCenter vaccinationCenter;

	@Column(nullable = false)
	private int capacity;

}