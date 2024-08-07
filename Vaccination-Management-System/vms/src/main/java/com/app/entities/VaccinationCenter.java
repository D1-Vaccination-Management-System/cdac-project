package com.app.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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

	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "addressId")
	private Address address;

	@OneToMany(mappedBy = "vaccinationCenter", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
	private List<Vaccines> vaccines;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "admin_id")
	private Admin admin;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "staff_id")
	private List<HealthStaff> staff;
}
