package com.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter
@NoArgsConstructor
public class Admin extends User {

	@OneToOne(mappedBy = "admin")
	private VaccinationCenter vaccinationCenter; // Corrected the field name
}
