package com.app.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vaccination_center")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationCenter extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "center_id")
	private Long centerId;

	@Column(name = "center_name", length = 255)
	private String centerName;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "addressId")
	private Address address;

	@OneToMany(mappedBy = "vaccinationCenter", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
	private List<Vaccines> vaccines;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "admin_id")
	private Admin admin;

	@OneToMany(fetch = FetchType.EAGER ,cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "staff_id")
	private List<HealthStaff> staff;
}
